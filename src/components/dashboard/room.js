import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import {SocketContext} from '../../contexts/socketContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/room.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
import Settings from './profile';
import Bottomnav from './_bottomnav'
import Chatheader from './chat-header'
import Sidebar from './sidebar'
import { IoMdSend } from 'react-icons/io'
import { FaCheckCircle,FaEllipsisV,FaRegCommentAlt, FaTimes, FaChartLine, FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import  { MdBookmarkBorder } from 'react-icons/md'
import { TiArrowDownOutline,TiArrowBack, TiArrowUpOutline } from 'react-icons/ti'
import { BiCommentDetail } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import TextareaAutosize from 'react-autosize-textarea';
import ReactFileReader from 'react-file-reader';
import userImg from '../../images/user-circle.svg'
import Navbar from './navbar'
import * as Scroll from 'react-scroll';
import {Helmet} from "react-helmet";
import Preview from '../utils/preview'


// like, comment, save, hide and report functions
function TopicFunction(prop){

    const [moreModal, setMoreModal] = useState('none')

    
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails, setScrollPos, scrollPos, topics, setTopics} = useContext(AuthContext);
    // const {themeMode,setThemeMode,isEnabled,setIsEnabled} = useContext(ThemeContext)
    const [ isUpVoted, setIsUpVoted ] = useState(false)
    const [ isDownVoted, setIsDownVoted ] = useState(false)

      
    //Upvote
    async function likeUnlike(){
        setIsUpVoted(true)
        setIsDownVoted(false)
        const res = await axios.post(`https://naij-react-backend.herokuapp.com/api/like-topic?user=${userDetails.email}&topic_id=${prop.topic_id}`);
        console.log(res)
    }
    async function downVoteState(){
        setIsUpVoted(false)
        setIsDownVoted(true)
        const res = await axios.post(`https://naij-react-backend.herokuapp.com/api/downvote-topic?user=${userDetails.email}&topic_id=${prop.topic_id}`);
    }
    console.log(isUpVoted,'isn v')   
    

    return (
        <div style={{width:'100%',display:'flex',justifyContent:'space-between', alignItems:'flex-end'}}> 

            <div style={{height:'30px',minWidth:'120px', display:'flex',justifyContent:'space-around', alignItems:'center',backgroundColor:'rgba(223,223,223,.3)',borderRadius:'1rem'}}>
                <span style={{color:isUpVoted ?'#5cab7d':'black',fontSize:'.8rem'}}>
                    <FiHeart 
                        color={isUpVoted ?'#5cab7d':'black'} 
                        onClick={()=>likeUnlike()} size={17}
                    />
                    {prop.likes}
                </span>
                {/* <TiArrowDownOutline color={isDownVoted ? '5cab7d':'black'} onClick={()=>downVoteState()} size={20}/> */}
                <span style={{fontSize:'.8rem'}}><MdBookmarkBorder size={20}/></span>
                <span style={{fontSize:'.8rem'}}><FaRegCommentAlt size={15}/> {prop.comments}</span>
            </div>
            {/* back modal */}
        {/* <div onClick={()=>setMoreModal('none')} style={{zIndex:2,width:"100%",height:'100%',position:'fixed',top:0,bottom:0,left:0,right:0}}></div> */}
            {/* <span style={{display:"flex",alignItems:'flex-end', flexDirection:"column"}}><MoreModal  topic_id={prop.topic_id} set={setMoreModal} mod={moreModal} state={moreModal} />
                <span className={styles.more_ellipsis}><FaEllipsisV style={{padding:'.25rem'}} onClick={()=>setMoreModal('block')} size={13} /></span>
            </span> */}
        </div>
    )
}


function Room(props) {

    const [ messages,setMesages ] = useState([]);
    const {socket} = useContext(SocketContext);
    const [ userMsg,setUserMsg ] = useState('');
    const [chat,setChat] = useState([]);
    const [ textABorder,setTextABorder ] = useState('0px');
    const [ preview_img_display, setPreview_img_display ] = useState('none')
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails,refTopic, setRefTopic} = useContext(AuthContext);
    const [ photo, setPhoto ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const [ roomActivity, setRoomActivity ] = useState([])
    const [loading, setLoading] = useState(true)
    const [img,setImg] =useState('')
    const [ replyMessage, setReplyMessage ] = useState([])
    const [ replyingTo, setReplyingTo ] = useState('')
    const [ replyState, setReplyState ] = useState(false)
    const [ replyDetails, setReplyDetails ] = useState([])
    const [ replies, setReplies ] = useState([])


    // console.log(props, 'props here')
    useEffect(()=>{
        async function reloadTopic(){
            axios.get(`https://naij-react-backend.herokuapp.com/api/refreshed-topic?slug=${props.match.params.room}`)
            .then((res) => {
                return res
            })
            .then((json) => {
                setRefTopic(json.data.topic)
                setImg(json.data.topic.img)
                setLoading(false)
                // return json.topic;

            })
            .catch((err) => {
                console.log(err)
            })
        }
        reloadTopic()
    },[])

    const [ topic, setTopic ] = useState(!props.history.location.topic_info ? refTopic : props.history.location.topic_info);
    const room = props.match.params.room;
    const username = userDetails.username
    const user_img = userDetails.img
    let scroll    = Scroll.animateScroll;

    function handleFiles(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setPreview_img_display('block')
    }
   
    function openImg(){
            var win = window.open();
            win.document.write('<iframe src="' + img  + '" frameborder="0" style="margin-left:auto; margin-right:auto; border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    }

    useEffect(()=>{
        //get messages
        async function getMessages(){
            const res = await axios.get(`http://localhost:3333/api/messages?slug=${props.match.params.room}`);
            setMesages(res.data);
            console.log('refreshed')         
            setChat([])   
        }
        getMessages()

        // refreshing the page every 15 seconds to get new message replys
        const interval = setInterval(()=>{
            getMessages()
        },15000)

        scroll.scrollTo(0);
        socket.emit("usr-joined", {username,room,user_img});

        socket.on("app-msg", msgFromServer => {
            // console.log(socket.id)
            setChat((prevChat)=>{
              return [
                msgFromServer,...prevChat
              ]
            })
        });
        //reply message from the server
        socket.on('reply-msg-server',replyMsg=>{
            setReplyMessage((prevMsg)=>{
                return [replyMsg, ...prevMsg]
            })
        // getMessages()
            

          
        })

        //user joined from server
        socket.on('room-bot-msg',activity=>{
            setRoomActivity((prevActivity)=>{
                return [activity, ...prevActivity]
            })
        })

        //user left from server
        socket.on('room-bot-msg_left',activity=>{
            setRoomActivity((prevActivity)=>{
                return [activity, ...prevActivity]
            })
        })

    return () => {
        socket.emit("usr-disconn",{username,room,user_img});
        // setAllMessages([])
        socket.off('app-msg')
        clearInterval(interval)
    }
    },[])


    const submitMsg=()=>{

        if(replyState){
            if(userMsg){
                socket.emit('reply-msg', {
                    msg_id:replyDetails.id,
                    reply_to:replyDetails.username,
                    reply_from:userDetails.username,
                    img:userDetails.img,
                    verified:userDetails.verified,
                    email:userDetails.email,
                    msg:userMsg,
                    room:room,
                })
                setReplyDetails([])
                setReplyState(false)
                setReplyingTo('')
                setUserMsg('')
            }
        }else{
            if(userMsg || photo){
                socket.emit('the-msg',{
                  msg:userMsg,
                  user_name:userDetails.username,
                  img:userDetails.img,
                  room:room,
                  verified:userDetails.verified,
                  email:userDetails.email,
                  photoBase64
                })
                setUserMsg('')
                setPhoto(null)
                setPhotoBase64('')
                setPreview_img_display('none')
            }else{
            console.log('nope')
            }
        }
      
      }

      // reply message
      const messageReply = (msg) => {
        setReplyDetails(msg)
        setReplyState(true)
        setReplyingTo(`replying to @${msg.sender_name}`)
      }

      const resetMessage=()=>{
        setReplyDetails([])
        setReplyState(false)
        setReplyingTo('')
      }

    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>{loading ? '' : refTopic.title}</title>
        </Helmet>
        <Navbar settings_link="" />
        <div className={styles.divBody}>
            <Chatheader />
            <div className={styles.row1} style={{paddingTop:'1.6rem',}}>
                {loading? <Preview/> : (<div className={styles.topicWrapper}>
                    <div style={{display:'flex',alignItems:'center',flexDirection:'row',paddingLeft:'1rem',paddingRight:'1rem',}}>
                        <img src={loading ? '' : refTopic.creator_img} style={{width:'60px',height:'60px',marginRight:'.5rem',borderRadius:'50%'}} />
                        {/* {JSON.stringify(refTopic)} */}
                        <div>
                            <p style={{margin:0}}>@{loading ? '' : refTopic.creator} {loading ? '' : refTopic.is_poster_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                        </div>
                    </div>
                    <div style={{paddingLeft:'1rem',marginTop:'.5rem'}}>
                        <p style={{fontStyle:'italic',fontWeight:'bold',fontSize:'.85rem',margin:0}}>{loading ? '' : refTopic.title}</p>
                    </div>

                    {/* <img src={topic.img} style={{width:'100%',borderRadius:'2rem'}} /> */}
                    {
                        loading ? '' : refTopic.img === 'data:image/png;base64,' ? <></> 
                        : 
                        <img src ={loading ? '' : refTopic.img} onClick={()=>openImg()}
                            style={{width:'95%',height:'100%', borderRadius:'.5rem', margin:'1rem'}}
                        />
                    }
                    {loading ? '' : <div style={{margin:'.5rem',paddingLeft:'.5rem',wordBreak:'break-all', textOverflow:'ellipsis'}} dangerouslySetInnerHTML={{__html: refTopic.topic_body}} ></div>}
                    {/* TIME AND DATE */}
                    <div style={{paddingLeft:'1rem',}}>
                        <p style={{fontSize:'.7rem',color:'grey'}}>{loading ? '' : `${refTopic.time} - ${refTopic.date}`}</p>
                    </div>
                </div>)}
                <div style={{marginLeft:'1rem'}}>
                    <TopicFunction likedby={refTopic.liked_by} likes={refTopic.likes} topic_id={refTopic.id} comments={refTopic.comment_count} />
                </div>
                <hr style={{color:'#5cab7d'}} />
                {chat.map(msg=>(
                    <div key={msg.id} style={{display:'flex',flexDirection:'row',alignItems:'flex-start',paddingTop:'1rem',borderBottom:'.5px solid #5cab7d',paddingLeft:'1rem'}}>
                        <div style={{width:'100%'}}>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <img src={msg.img} style={{width:'30px',height:'30px',borderRadius:'50%',marginRight:'.5rem'}} />
                                <p style={{fontSize:'.75rem',margin:0,color:'grey'}}>@{msg.username} {msg.verified == 'true' ? <FaCheckCircle size={10} color='#5cab7d'/> : <></>}</p>
                            </div>
                            <div style={{marginLeft:'2.5rem',width:'80%',wordBreak:'break-word'}}>
                                <p style={{margin:'0rem'}}>{msg.text}</p>
                            </div>
                            <div style={{display:'flex',width:'90%', marginLeft:'2.5rem',alignItems:'center',justifyContent:"space-between" }}>
                                <p style={{fontSize:'.7rem',color:'grey'}}>{msg.time} </p>
                                {/* <TiArrowBack onClick={()=>messageReply(msg)} style={{cursor:'pointer',marginRight:"1rem"}} color='#5cab7d' size={20}/> */}
                            </div>
                            {/* <p style={{fontSize:'.75rem',margin:0,marginRight:'.5rem',color:'grey'}}>@{msg.username} {msg.verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p>{msg.text}</p> */}
                            
                            {/* <div style={{display:'flex',width:'100%', alignItems:'center',justifyContent:"space-between" }}>
                                <p style={{fontSize:'.75rem',color:'grey'}}>{msg.date} - {msg.time} </p>
                                <TiArrowBack onClick={()=>messageReply(msg)} style={{marginRight:"1rem",cursor:'pointer'}} color='grey' size={20}/>
                            </div>  */}
                            {/* <div style={{backgroundColor:'red',width:'95%'}}>
                                {replyMessage.map(msg=>(
                                    <>
                                        <img src={msg.img} style={{width:'30px',height:"30px",borderRadius:'50%' }}/>
                                        <p style={{fontSize:'.75rem',margin:0,marginRight:'.5rem',color:'red'}}>@{msg.reply_from} replying {msg.verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}
                                        </p>
                                        <p>{msg.text}</p>
                                    </>
                                ))} 
                            </div> */}
                        </div>
                        
                    </div>
                ))}
                {messages.map(msg=>(
                    <div key={msg.id} style={{display:'flex',flexDirection:'column',alignItems:'flex-start',paddingTop:'1rem',borderBottom:'.5px solid #5cab7d',paddingLeft:'1rem'}}>
                        <div style={{width:'100%'}}>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <img src={msg.img} style={{width:'30px',height:'30px',borderRadius:'50%',marginRight:'.5rem'}} />
                                <p style={{fontSize:'.75rem',margin:0,color:'grey'}}>@{msg.sender_name} {msg.is_msg_sender_verified == 'true' ? <FaCheckCircle size={10} color='#5cab7d'/> : <></>}</p>
                            </div>
                            <div style={{marginLeft:'2.5rem',width:'80%',wordBreak:'break-word'}}>
                                <p style={{margin:'0rem'}}>{msg.messages}</p>
                            </div>
                            <div style={{display:'flex',width:'90%', marginLeft:'2rem',alignItems:'center',justifyContent:"space-between" }}>
                                <p style={{fontSize:'.75rem',color:'grey', marginLeft:'.5rem'}}>{msg.date} - {msg.time} </p>
                                <TiArrowBack onClick={()=>messageReply(msg)} style={{cursor:'pointer',marginRight:"1rem"}} color='#5cab7d' size={20}/>
                            </div>
                            <p style={{marginLeft:'2rem',color:'grey',fontSize:'.7rem',display:'flex',alignItems:'center'}}>replies <TiArrowBack/> </p>
                            {msg.replies.map(reply=>(
                                <div style={{marginLeft:'2rem',paddingTop:".25rem"}}  key={reply.id}>
                                    <div style={{display:"flex",alignItems:'center'}}>
                                        <img src={reply.img} style={{width:'30px',marginRight:'.5rem',height:"30px",borderRadius:'50%' }}/>
                                        <p style={{fontSize:'.75rem',margin:0,marginRight:'1rem',color:'grey'}}> {reply.reply_from == userDetails.username ? 'you' : '@'+reply.reply_from}{reply.is_reply_sender_verified === 'true' ? <FaCheckCircle size={10} color='#5cab7d'/> : <></>}
                                        <span style={{fontSize:'.7rem',fontWeight:'bold',fontStyle:'italic'}}> replied</span> 
                                        </p>
                                    </div>
                                    <p style={{marginLeft:"2rem",fontSize:".8rem"}}>{reply.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div style={{ position:'fixed', bottom:'50px', display:preview_img_display}}>
                    <img src={photo} width="150px" height="150px" style={{borderRadius:'1.5rem',border:'.5px solid #5cab7d'}} />
                    <FaTimes size={30} onClick={()=>{setPreview_img_display('none'); setPhotoBase64(''); setPhoto('')}} color='grey' />
                </div>
                <div className={styles.chatInput} >
                    {/* <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                        <span style={{marginLeft:'5px'}}><FaImage color="#5cab7d" size={35} /></span>
                    </ReactFileReader> */}
                    <p onClick={()=>resetMessage()} style={{fontSize:'.7rem',padding:'.1rem',backgroundColor:'grey',color:'white'}}>{replyingTo}</p>
                    <input onChange={e=>setUserMsg(e.target.value)} style={{width:'85%',padding:'1rem',border:'0',outline:'none'}} value={userMsg} maxLength={250} placeholder="start typing..." />
                    <IoMdSend onClick={()=>submitMsg()} color="#5cab7d" size={30} style={{cursor:'pointer',marginBottom:'8px',marginRight:'0px'}}/>
                </div>
            </div>
            <div className={styles.row2}>
                <div> 
                    <h3>Lorem ipsum.</h3>
                </div>
            </div>
            {/* <p>room page</p>
            {props.match.params.room }
            {JSON.stringify()} */}
            {/* <Bottomnav /> */}
        </div>
        </>
    )
}

export default Room
