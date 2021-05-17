import React,{ useEffect, useState, useContext } from 'react'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/shared-topic.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
import Settings from './settings';
import Bottomnav from './_bottomnav'
import Chatheader from './chat-header'
import Sidebar from './sidebar'
import { FaImage, FaCheckCircle, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io'
import TextareaAutosize from 'react-autosize-textarea';
import ReactFileReader from 'react-file-reader';
import userImg from '../../images/user-circle.svg'
import Navbar from './navbar'
import * as Scroll from 'react-scroll';
import {Helmet} from "react-helmet";

function SharedTopic(props) {

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


   

    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>{loading ? '' : refTopic[0].title}</title>
        </Helmet>
        <Navbar settings_link="" />
        <div className={styles.divBody}>
            <Chatheader title={loading ? '' : refTopic[0].title} />
            <div className={styles.row1} style={{paddingTop:'1.6rem',}}>
                <div className={styles.topicWrapper} style={{borderBottom:'.5px solid #5cab7d'}}>
                    <div style={{display:'flex',alignItems:'center',flexDirection:'row',paddingLeft:'1rem',paddingRight:'1rem',}}>
                        <img src={loading ? '' : refTopic[0].creator_img} style={{width:'60px',height:'60px',marginRight:'.5rem',borderRadius:'50%'}} />
                        {/* {JSON.stringify(refTopic)} */}
                        <div>
                            <p style={{margin:0}}>{loading ? '' : refTopic[0].creator} {loading ? '' : refTopic[0].is_poster_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p style={{fontWeight:'bold',margin:0}}>{loading ? '' : refTopic[0].title}</p>
                        </div>
                    </div>
                    {/* <img src={topic.img} style={{width:'100%',borderRadius:'2rem'}} /> */}
                    {
                        loading ? '' : refTopic[0].img === 'data:image/png;base64,' ? <></> 
                        : 
                        <img src ={loading ? '' : refTopic[0].img} onClick={()=>openImg()}
                            style={{width:'95%',height:'100%', borderRadius:'.5rem', margin:'1rem'}}
                        />
                    }
                    {loading ? '' : <div style={{paddingLeft:'1rem',wordBreak:'break-all', textOverflow:'ellipsis'}} dangerouslySetInnerHTML={{__html: refTopic[0].topic_body}} ></div>}
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
