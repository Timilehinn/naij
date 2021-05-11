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
import { FaImage, FaCheckCircle, FaPaperPlane, FaTimes } from 'react-icons/fa';
import TextareaAutosize from 'react-autosize-textarea';
import ReactFileReader from 'react-file-reader';
import userImg from '../../images/user-circle.svg'
import Navbar from './navbar'
import * as Scroll from 'react-scroll';
import {Helmet} from "react-helmet";

function Room(props) {

    const [ messages,setMesages ] = useState([]);
    const {socket} = useContext(SocketContext);
    const [ userMsg,setUserMsg ] = useState('');
    const [chat,setChat] = useState([]);
    const [ textABorder,setTextABorder ] = useState('0px');
    const [ preview_img_display, setPreview_img_display ] = useState('none')
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ photo, setPhoto ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const [ roomActivity, setRoomActivity ] = useState([])
    console.log(props, 'props here')

    const topic = props.history.location.topic_info;
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
                <title>{topic.title}</title>
        </Helmet>
        <Navbar settings_link="" />
        <div className={styles.divBody}>
            <Chatheader title={topic.title} />
            <div className={styles.row1} style={{paddingTop:'1.6rem',}}>
                <div className={styles.topicWrapper} style={{borderBottom:'.5px solid #5cab7d'}}>
                    <div style={{display:'flex',alignItems:'center',flexDirection:'row',paddingLeft:'1rem',paddingRight:'1rem',}}>
                        <img src={topic.creator_img} style={{width:'60px',height:'60px',marginRight:'.5rem',borderRadius:'50%'}} />
                        <div>
                            <p style={{margin:0}}>{topic.creator} {topic.is_poster_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p style={{fontWeight:'bold',margin:0}}>{topic.title}</p>
                        </div>
                    </div>
                    {/* <img src={topic.img} style={{width:'100%',borderRadius:'2rem'}} /> */}
                    {
                        topic.img === 'data:image/png;base64,' ? <></> 
                        : 
                        <img src ={topic.img} onClick={()=>window.open(`'${topic.img}'`)}
                            style={{width:'95%',height:'300px', borderRadius:'.5rem', margin:'1rem'}}
                        />
                    }
                    <p style={{marginLeft:'1rem'}}>{topic.topic_body}</p>
                </div>
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
                    <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                        <span style={{marginLeft:'5px'}}><FaImage color="#5cab7d" size={35} /></span>
                    </ReactFileReader>
                    <TextareaAutosize onChange={e=>setUserMsg(e.target.value)} style={{width:'80%',maxHeight:100,border:'0',outline:'none'}} rows="2" value={userMsg} maxLength={250} placeholder="start typing..." />
                    <FaPaperPlane onClick={()=>submitMsg()} color="#5cab7d" size={30} style={{marginBottom:'5px',marginRight:'5px'}}/>
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
