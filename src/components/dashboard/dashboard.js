import React,{ useEffect,useLayoutEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/dash.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
import Settings from './settings';
import Bottomnav from './_bottomnav'
import Header from './header'
import Sidebar from './sidebar'
import { FaCheckCircle, FaChartLine, FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import  { MdBookmarkBorder } from 'react-icons/md'
import { IoMdChatboxes,IoMdHeart,IoIosImage, IoMdArrowDown,IoMdArrowUp, IoIosChatbubbles } from 'react-icons/io'
import userImg from '../../images/user-circle.svg'
import Navbar from './navbar'
import * as Scroll from 'react-scroll';

function TopicFunction(prop){
    return (
        <div style={{width:'100px',display:'flex',alignItems:'center',height:'30px',backgroundColor:'rgba(223,223,223,.5)',borderRadius:'1rem'}}> 
            <IoMdArrowUp size={20}/>
            <IoMdArrowDown size={20}/> 
            <MdBookmarkBorder size={25}/>
            <IoMdChatboxes size={20}/> {prop.comments}
        </div>
    )
}

function Dashboard(props) {  
    const history = useHistory();
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails, setScrollPos, scrollPos} = useContext(AuthContext);
    const [ topics, setTopics ] = useState([]);
    const [ switchPage, setSwitchPage ] = useState('home')
    const [ loader, setLoader ] = useState(true)

    let scroll    = Scroll.animateScroll;
    

    useEffect(()=>{
        async function getTopics(){
            const res = await axios.get('http://localhost:3333/topics');
            console.log(res.data)
            setTopics(res.data);
            setLoader(false)
        }
        getTopics();

        //to scroll back to previou position
        scroll.scrollTo(scrollPos);
       
    },[])

    

    useLayoutEffect(()=>{
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPos(position);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
       
    },[])


    return (
        <>
        <Navbar />
        <div className={styles.divBody}>
        <Header title="Recent topics" />
            <div className={styles.row1}>
                {/* create topic div */}
                
               {
                   loader ? <div className={styles.the_box}>
                       <div className={styles.loader}></div>
                   </div>
                   :
                   topics.map(topic=>(
                   <Link to={{ pathname:`/topic/${topic.slug}`, topic_info:topic }} 
                         style={{color:'black',textDecoration:'none'}}>
                        <div className={styles.topicDiv} key={topic.id} key={topic.id}>
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
                            {/* MARKDOWN SAVED IN THE DATABSE IS CONVERTED TO HTML HERE */}
                                {topic.topic_body ? ( <div style={{paddingLeft:'0rem',wordBreak:'break-all', textOverflow:'ellipsis'}} dangerouslySetInnerHTML={{__html: topic.topic_body}} ></div> ) :''  }
                                <p style={{fontSize:'.8rem',color:'grey'}}>{topic.date} {topic.time}</p>
                            </div>
                            <TopicFunction comments={topic.comment_count} />
                            {/* <div> <FaArrowUp onClick={()=>alert(scrollPos)} size={20}/> <FaArrowDown size={20}/> <MdBookmarkBorder size={25}/>
                                <IoMdChatboxes size={20}/> {topic.comment_count}
                            </div> */}
                        </div>
                   </Link>
               ))}
            </div>
            <div className={styles.row2}>
                <div> 
                    <h3>Top trending</h3>
                    <p> <FaChartLine />lore ipsum dor itemt</p>
                    <p> <FaChartLine />lore ipsum dor itemt</p>
                    <p> <FaChartLine />lore ipsum dor itemt</p>
                </div>
            </div>
            {/* BOTTOM NAV */}
            <Bottomnav />
            
        </div>
        </>
    )
}

export default Dashboard
