import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/viewprofile.module.css';
import axios from 'axios';
import Bottomnav from './_bottomnav'
import Header from './header'
import Navbar from './navbar'
import Preview from '../utils/preview'
import Linkify from 'react-linkify';
import { FaCheckCircle,FaEllipsisV,FaRegCommentAlt, FaTimes, FaChartLine, FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import { BiUser, BiGlobe } from 'react-icons/bi'
import { BsInfo } from 'react-icons/bs'
import { TiLocationOutline } from 'react-icons/ti'


function ViewProfile(props) {
    const username = props.match.params.username;
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ user, setUser ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userTopics, setUserTopics ] = useState([])


    useEffect(()=>{
        const findUser = async ()=>{
            const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/find-user-profile?user=${username}`);
            console.log(res)
            if(res.data.found){
                setLoading(false)
            }
            setUser(res.data.details)
        }
        findUser();

        const getUserTopics = async ()=>{
            const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/user-topics?user=${username}`)
            console.log(res)
            if(res.data.done){
                setLoading(false)
            }
            setUserTopics(res.data.topics)
        }
        getUserTopics()
    
    },[])

 

    return (
        <div className={styles.divBody}>
        <Navbar />
        {/* <Header title="Profile" />                              */}
            <div className={styles.row1}>
                {user? <p style={{marginLeft:'1rem'}}>@{user.username}'s topics</p> : <p style={{marginLeft:'1rem'}}></p>}
                  {loading ? <><Preview /><Preview /></> : 
                    userTopics.map(topic=>(
                    <div className={styles.topicDiv} key={topic.id} key={topic.id}>
                            <Link key={topic.id} to={{ pathname:`/topic/${topic.slug}`, topic_info:topic }} 
                                 style={{color:'black',textDecoration:'none'}}>
                                <div style={{display:'flex',alignItems:'center',flexDirection:'row',marginLeft:'.5rem'}}>
                                    <img src={topic.creator_img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                                    <div style={{marginLeft:'.5rem'}}>
                                        <p style={{fontSize:'.75rem',color:'grey'}}>Posted by @{topic.creator} {topic.is_poster_verified == 'true' ? <FaCheckCircle size={12} color='#5cab7d'/> : <></>}</p>
                                    </div>
                                </div>
                                <p style={{fontWeight:'bold',marginLeft:'.5rem',marginBottom:'0rem'}}>{topic.title}</p>
                                <div style={{display:'flex',flexDirection:'column',marginLeft:'0rem',padding:'.5rem'}}>
                                {topic.img === 'data:image/png;base64,' ? <div style={{height:'0px'}}></div> 
                                    : 
                                    <img src={topic.img} style={{borderRadius:'.5rem'}} width="auto" height="300px" />
                                }
                                    {topic.topic_body ? ( <Linkify><div style={{paddingLeft:'0rem',wordBreak:'break-all'}}>{topic.topic_body.length > 200 ? topic.topic_body.substring(0,200) + ' ...' : topic.topic_body }</div></Linkify> ) :''  }
                                    <p style={{fontSize:'.8rem',color:'grey'}}>{topic.date} {topic.time}</p>
                                    <p style={{fontSize:'.8rem',color:'grey',fontStyle:"italic"}}>likes: {topic.likes} replies: {topic.comment_count} </p>
                                </div>
                            </Link>
                    </div>
                    ))}
            </div>
            <div className={styles.row2}>
            {user ? 
            <>
                <div className={styles.posterdiv} style={{display:'flex',justifyContent:'center',backgroundSize:'cover',flexDirection:'column',alignItems:'center',width:'100%',backgroundImage:`url(${user.poster_img})`}}>
                </div>
                <div style={{display:'flex',width:'95%',alignItems:'flex-start',flexDirection:'column',marginTop:'-2rem',marginLeft:'.3rem'}}>
                    <img src={user.img} width="75px" height="75px" style={{borderRadius:'50%',backgroundColor:'white'}} />
                    {/* <span style={{marginLeft:'-1rem',cursor:'pointer'}}><FaPen color="#5cab7d" size={15} /></span> */}
                    {user.fullname ? <h3>{user.fullname}</h3> :<></>}
                    <p style={{display:'flex',alignItems:'center',fontSize:'.75rem',color:'grey',margin:'2px'}}><BiUser/> @{user.username}</p>
                    {user.description ? <Linkify><p style={{fontSize:'.7rem',margin:'2px'}}>{user.description}</p></Linkify>:<></>}
                    {user.location ? <p style={{display:'flex',alignItems:'center',fontSize:'.7rem', color:'grey',margin:0}}><TiLocationOutline /> {user.location}</p> :<></>}
                    {user.url ? <Linkify><p style={{display:'flex',alignItems:'center',fontSize:'.7rem', color:'grey'}}><BiGlobe /> {user.url}</p></Linkify> :<p style={{margin:0}}></p>}
                    <p style={{display:'flex',alignItems:'center',fontSize:'.7rem',color:'grey',margin:'2px'}}>Joined {new Date(user.createdAt).getUTCMonth()}/{new Date(user.createdAt).getFullYear()}</p>
                </div>
                </>
                :
                <p>User not found</p>
            }
            </div>
            <Bottomnav />
        </div>
    )
}

export default ViewProfile
