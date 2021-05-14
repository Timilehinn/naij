import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import {SocketContext} from '../../contexts/socketContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/room.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
import Settings from './settings';
import Bottomnav from './_bottomnav'
import Chatheader from './chat-header'
import Sidebar from './sidebar'
import { IoMdSend } from 'react-icons/io'
import { FaCheckCircle,FaEllipsisV,FaRegCommentAlt, FaTimes, FaChartLine, FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import  { MdBookmarkBorder } from 'react-icons/md'
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti'
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
    async function upVoteState(){
        setIsUpVoted(true)
        setIsDownVoted(false)
        const res = await axios.post(`https://naij-react-backend.herokuapp.com/api/upvote-topic?user=${userDetails[0].email}&topic_id=${prop.topic_id}`);
        console.log(res)
    }
    async function downVoteState(){
        setIsUpVoted(false)
        setIsDownVoted(true)
        const res = await axios.post(`https://naij-react-backend.herokuapp.com/api/downvote-topic?user=${userDetails[0].email}&topic_id=${prop.topic_id}`);
    }
    console.log(isUpVoted,'isn v')   
    

    return (
        <div style={{width:'100%',display:'flex',justifyContent:'space-between', alignItems:'flex-end'}}> 

            <div style={{height:'30px',minWidth:'120px', display:'flex',justifyContent:'space-around', alignItems:'center',backgroundColor:'rgba(223,223,223,.3)',borderRadius:'1rem'}}>
                <span style={{color:isUpVoted ?'#5cab7d':'black',fontSize:'.8rem'}}>
                    <FiHeart 
                        color={isUpVoted ?'#5cab7d':'black'} 
                        onClick={()=>upVoteState()} size={17}
                    />
                    {prop.upvotes}
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
    // console.log(props, 'props here')
    useEffect(()=>{
        async function reloadTopic(){
            axios.get(`https://naij-react-backend.herokuapp.com/refreshed-topic?slug=${props.match.params.room}`)
            .then((res) => {
                return res
            })
            .then((json) => {
                setRefTopic(json.data.topic)
                setImg(json.data.topic[0].img)
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
    const username = userDetails[0].fullname
    const user_img = userDetails[0].img
    let scroll    = Scroll.animateScroll;

    function handleFiles(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setPreview_img_display('block')
    }
    useEffect(()=>{
      
    },[])
function openImg(){
        var win = window.open();
        win.document.write('<iframe src="' + img  + '" frameborder="0" style="margin-left:auto; margin-right:auto; border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}
    useEffect(()=>{
        async function getMessages(){
            console.log(socket.id,' here')
            const res = await axios.get(`https://naij-react-backend.herokuapp.com/messages?slug=${props.match.params.room}`);
            setMesages(res.data);
        }
        getMessages()
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
    }
    },[])


    const submitMsg=()=>{
        if(userMsg || photo){
          socket.emit('the-msg',{
            msg:userMsg,
            user_name:userDetails[0].fullname,
            img:userDetails[0].img,
            room:room,
            verified:userDetails[0].verified,
            email:userDetails[0].email,
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



    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>{loading ? '' : refTopic[0].title}</title>
        </Helmet>
        <Navbar settings_link="" />
        <div className={styles.divBody}>
            <Chatheader />
            <div className={styles.row1} style={{paddingTop:'1.6rem',}}>
                {loading? <Preview/> : (<div className={styles.topicWrapper}>
                    <div style={{display:'flex',alignItems:'center',flexDirection:'row',paddingLeft:'1rem',paddingRight:'1rem',}}>
                        <img src={loading ? '' : refTopic[0].creator_img} style={{width:'60px',height:'60px',marginRight:'.5rem',borderRadius:'50%'}} />
                        {/* {JSON.stringify(refTopic)} */}
                        <div>
                            <p style={{margin:0}}>@{loading ? '' : refTopic[0].creator} {loading ? '' : refTopic[0].is_poster_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                        </div>
                    </div>
                    <div style={{paddingLeft:'1rem',marginTop:'.5rem'}}>
                        <p style={{fontStyle:'italic',fontWeight:'bold',fontSize:'.85rem',margin:0}}>{loading ? '' : refTopic[0].title}</p>
                    </div>

                    {/* <img src={topic.img} style={{width:'100%',borderRadius:'2rem'}} /> */}
                    {
                        loading ? '' : refTopic[0].img === 'data:image/png;base64,' ? <></> 
                        : 
                        <img src ={loading ? '' : refTopic[0].img} onClick={()=>openImg()}
                            style={{width:'95%',height:'100%', borderRadius:'.5rem', margin:'1rem'}}
                        />
                    }
                    {loading ? '' : <div style={{margin:'.5rem',paddingLeft:'.5rem',wordBreak:'break-all', textOverflow:'ellipsis'}} dangerouslySetInnerHTML={{__html: refTopic[0].topic_body}} ></div>}
                    {/* TIME AND DATE */}
                    <div style={{paddingLeft:'1rem',}}>
                        <p style={{fontSize:'.7rem',color:'grey'}}>{loading ? '' : `${refTopic[0].time} - ${refTopic[0].date}`}</p>
                    </div>
                </div>)}
                <TopicFunction upvotedby={refTopic[0].upvoted_by} upvotes={refTopic[0].upvotes} topic_id={refTopic[0].id} comments={refTopic[0].comment_count} />
                <hr style={{color:'#5cab7d'}} />
                {chat.map(msg=>(
                    <div key={msg.id} style={{display:'flex',flexDirection:'row',alignItems:'flex-start',paddingTop:'1rem',borderBottom:'.5px solid #5cab7d',paddingLeft:'1rem'}}>
                        {/* this shows the default profile image if the user has not set a profile image yet (default is 'user-img') */}
                        {/* <span style={{display:"flex",flexDirection:'row',alignItems:'center'}}>
                            <img src={msg.img} style={{width:'30px',height:'30px',borderRadius:'50%',marginRight:'.5rem'}} />
                            <p style={{fontSize:'.75rem',color:'grey'}}>@{msg.username} {msg.verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                        </span> */}
                        {
                            msg.img === 'user-img' ? <img src={userImg} style={{width:'25px',height:"25px",borderRadius:'50%' }} />
                            :
                            <img src={msg.img} style={{width:'30px',height:"30px",borderRadius:'50%' }}/>
                        }
                        <div>
                            <p style={{fontSize:'.75rem',margin:0,marginRight:'.5rem',color:'grey'}}>@{msg.username} {msg.verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p>{msg.text}</p>
                            {
                                msg.msg_w_img === 'data:image/png;base64,' ? <></> 
                                : 
                                <img src ={msg.msg_w_img} 
                                    style={{width:'90%',maxWidth:600,marginLeft:15,marginTop:5,marginBottom:5,height:150}}
                                />
                            }
                            <p style={{fontSize:'.75rem',color:'grey'}}>{msg.date} - {msg.time}</p>
                        </div>
                    </div>
                ))}
                {messages.map(msg=>(
                    <div key={msg.id} style={{display:'flex',flexDirection:'row',alignItems:'flex-start',paddingTop:'1rem',borderBottom:'.5px solid #5cab7d',paddingLeft:'1rem'}}>
                        <img src={msg.img} style={{width:'30px',height:'30px',borderRadius:'50%',marginRight:'.5rem'}} />
                        <div>
                            <p style={{fontSize:'.75rem',margin:0,color:'grey'}}>@{msg.name} {msg.is_msg_sender_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p>{msg.messages}</p>
                            {
                                msg.messages_with_img === 'data:image/png;base64,' ? <></> 
                                : 
                                <img src ={msg.messages_with_img} 
                                    style={{width:'90%',maxWidth:600,marginLeft:15,marginTop:5,marginBottom:5,height:150}}
                                />
                            }
                            <p style={{fontSize:'.75rem',color:'grey'}}>{msg.date} - {msg.time}</p>
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
                    <input onChange={e=>setUserMsg(e.target.value)} style={{width:'85%',padding:'1rem',border:'0',outline:'none'}} value={userMsg} maxLength={250} placeholder="start typing..." />
                    <IoMdSend onClick={()=>submitMsg()} color="#5cab7d" size={30} style={{cursor:'pointer',marginBottom:'8px',marginRight:'0px'}}/>
                </div>
            </div>
            <div className={styles.row2}>
                <div> 
                    <h3>Room activity.</h3>
                    {roomActivity.map(activity=>(
                        <span style={{display:'flex',flexDirection:'row',fontSize:'.75rem',alignItems:'center'}}>
                            <img src={activity.img} height="20px" width="20px" style={{borderRadius:'50%'}} />
                            <span style={{color:'grey',fontStyle:'italic',marginRight:'.5rem'}}>@{activity.username}</span> {activity.msg}
                        </span>
                    ))}
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
