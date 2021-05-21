import React,{ useEffect,useLayoutEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import {ThemeContext} from '../../contexts/themeContextApi'
import {SocketContext} from '../../contexts/socketContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/timeline.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
import Profile from './Profile/profile';
import Bottomnav from './_bottomnav'
import Header from './header'
import Sidebar from './sidebar'
import { FaCheckCircle,FaEllipsisV,FaRegCommentAlt, FaChartLine, FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import  { MdBookmarkBorder } from 'react-icons/md'
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti'
import { BiCommentDetail } from 'react-icons/bi'
import { AiOutlineRetweet, AiOutlineLike } from 'react-icons/ai'
import { IoMdChatboxes, IoEllipsisVerticalOutline,IoMdHeart,IoIosImage, IoMdArrowDown,IoMdArrowUp,IoMdRefresh, IoIosChatbubbles } from 'react-icons/io'
import { FiHeart } from 'react-icons/fi'
import userImg from '../../images/user-circle.svg'
import Navbar from './navbar'
import * as Scroll from 'react-scroll';
import Preview from '../utils/preview'
import Linkify from 'react-linkify';
import Modal from 'react-modal';
import MoreModal from '../utils/moreModal'
import { ToastContainer, toast } from 'react-toastify';
import addTopic from '../../images/addTopicButton.png';
import LazyLoad from 'react-lazyload';


// like, comment, save, hide and report functions
function TopicFunction(prop){
    const [moreModal, setMoreModal] = useState('none')
    const {socket} = useContext(SocketContext);
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails, setScrollPos, scrollPos, topics, setTopics} = useContext(AuthContext);
    const {themeMode,setThemeMode,isEnabled,setIsEnabled} = useContext(ThemeContext)
    const [ isLiked, setIsLiked ] = useState(false)
    const [ isDownVoted, setIsDownVoted ] = useState(false)
    const [ likeCount, setLikeCount ] = useState(0)
    const [ islikedBy, setIsLikedBy ] = useState(prop.likedby)

    //Like and unlike post
    async function likeUnlike(){
        if(isLiked == false){
            setIsLiked(true)
            setLikeCount(likeCount + 1)
        }else{
            setIsLiked(false)
            setLikeCount(likeCount - 1)
        }
        const res = await axios.post(`http://localhost:3333/api/like-topic?user=${userDetails.email}&topic_id=${prop.topic_id}`);
        if(res.data.done && res.data.liked){
                await axios.post('http://localhost:3333/api/create-notification',{topic_id:prop.topic_id, from:userDetails.username,to:prop.creator,type:'like',img:userDetails.img,verified:userDetails.verified})
        }
    }
    // useEffect(()=>{
    //     const found = islikedBy.find(likedby=>likedby.email === userDetails.email)

    //     function findLikes(){
    //         if(found) return setIsLiked(true)
    //     }
    // },[])
        
        // if(found !== undefined) {
        //     setIsLiked(true)
        // }
   

    return (
        <div style={{width:'100%',display:'flex',justifyContent:'space-between', alignItems:'flex-end'}}> 

            <div style={{height:'30px',minWidth:'120px', display:'flex',justifyContent:'space-around', alignItems:'center',backgroundColor:'rgba(223,223,223,.3)',borderRadius:'1rem'}}>
                <span style={{color:isLiked ?'#5cab7d':'black',fontSize:'.6rem'}}>
                    <FiHeart 
                        color={isLiked ?'#5cab7d':'black'} 
                        onClick={()=>likeUnlike()} size={17}
                    />
                    {prop.likes}
                </span>
                {/* <TiArrowDownOutline color={isDownVoted ? '5cab7d':'black'} onClick={()=>downVoteState()} size={20}/> */}
                <span style={{fontSize:'.8rem'}}><AiOutlineRetweet size={20}/></span>
                <span style={{fontSize:'.6rem'}}><FaRegCommentAlt size={15}/> {prop.comments}</span>
            </div>
            {/* back modal */}
            {/* <div onClick={()=>setMoreModal('none')} style={{zIndex:2,width:"100%",height:'100%',position:'fixed',top:0,bottom:0,left:0,right:0}}></div> */}
            <span style={{display:"flex",alignItems:'flex-end', flexDirection:"column"}}><MoreModal topic={prop.topic} topic_id={prop.topic_id} set={setMoreModal} mod={moreModal} state={moreModal} />
                <span className={styles.more_ellipsis}><FaEllipsisV style={{padding:'.25rem'}} onClick={()=>setMoreModal('block')} size={13} /></span>
            </span>
        </div>
    )
}

function Dashboard(props) {  
    const history = useHistory();
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails, setScrollPos, scrollPos, topics, setTopics,
        notifCount, setNotifCount,notifications, setNotifications
    } = useContext(AuthContext);
    const [ switchPage, setSwitchPage ] = useState('home')
    const [ loading, setLoading ] = useState(true)
    const [ offset, setOffset ] = useState(15)
    const [ nextBtnDisabled , setNextBtnDisabled ] = useState(false)
    const [ prevBtnDisabled , setPrevBtnDisabled ] = useState(false)

    let scroll = Scroll.animateScroll;

    
    // GET NEWER TOPICS
    async function getNewerTopics(){
        const res = await axios.get(`http://localhost:3333/api/topics?offset=0`);
        console.log('refreshed')
        if(res.data.success){
            setLoading(false)
        }
        setTopics(res.data.details);
        
        setOffset(15)
    }
    // setPage(page + 1)


    // OLDER TOPICS
    function olderTopics(){
        async function getTopics(){
            const res = await axios.get(`http://localhost:3333/api/topics?offset=${offset}`);
            console.log(res.data)
            if(res.data.success){
                setLoading(false)
            }
            setTopics((prevTopics)=>{
                return [...prevTopics, ...res.data.details]
            })
           
            setPrevBtnDisabled(false)
        }
        getTopics();
        setOffset(offset + 15)
    }

    
    
    
    useEffect(()=>{
        async function getTopics(){
            const res = await axios.get(`http://localhost:3333/api/topics?offset=0`);
            console.log(res.data)
            if(res.data.success){
                setLoading(false)
            }
            setTopics(res.data.details);
        }
        getTopics();

        // REFRESH TIMELINE EVERY 15 SECONDS
        const interval = setInterval(()=>{
            getTopics();
        },15000)

        //to scroll back to previou position
        scroll.scrollTo(scrollPos); 
        return () => {
            clearInterval(interval)
            console.log('timeline interval cleared')
        };
       
    },[])

    useEffect(()=>{
        const getNotifications =async()=>{
            const res = await axios.get(`http://localhost:3333/api/get-notifications?user=${userDetails.username}`)
            console.log(res)
            setNotifications(res.data.details.filter(dets=>dets.n_from !== userDetails.username))
            setNotifCount(res.data.details.length)
        }
        getNotifications();

       

        return () => {
            console.log('get notification interval cleared')
        };
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

    function backToTop(){
        scroll.scrollTo(0,0);
    }

    const {toggle,setToggle} = useContext(ThemeContext);


    return (
        <>
            <ToastContainer />

            <Navbar />
            <div className={styles.divBody}>
            <Header title="Recent topics" />
            
                <div className={styles.row1}>
                <p style={{display:'flex',cursor:'pointer', alignItems:'center',flexDirection:'row',marginBottom:'.25rem'}} onClick={()=>getNewerTopics()}>refresh <IoMdRefresh/>
                </p>

                {
                    loading ? <><Preview/><Preview/></>
                    :
                    topics.map(topic=>(
                        <div className={styles.topicDiv} key={topic.id} key={topic.id}>
                            <Link key={topic.id} to={{ pathname:`/topic/${topic.slug}/${topic.creator}`, topic_info:topic }} 
                                 style={{color:'black',textDecoration:'none'}}>
                                <div style={{display:'flex',alignItems:'center',flexDirection:'row',marginLeft:'.5rem'}}>
                                    <img src={topic.creator_img} style={{width:'30px',height:"30px",borderRadius:'50%' }}/>
                                    <div style={{marginLeft:'.5rem'}}>
                                        <p style={{fontSize:'.75rem',color:'grey'}}>@{topic.creator} {topic.is_poster_verified == 'true' ? <FaCheckCircle size={12} color='#5cab7d'/> : <></>}{topic.time} - {topic.date}</p>
                                    </div>
                                </div>
                                <div style={{display:"flex",justifyContent:'space-between'}}>
                                    <div style={{marginBottom:'1rem'}}>
                                        <p style={{fontWeight:'bold',marginLeft:'.5rem',marginBottom:'.5rem'}}>{topic.title}</p>
                                        {topic.topic_body ? ( <Linkify><div className={styles.topic_body} style={{marginLeft:'.5rem',wordBreak:'break-all'}}>{topic.topic_body.length > 200 ? topic.topic_body.substring(0,200) + ' ...' : topic.topic_body }</div></Linkify> ) :''  }
                                    </div>
                                    <div style={{display:'flex',flexDirection:'column',marginLeft:'0rem',padding:'.5rem'}}>
                                        {topic.img === 'data:image/png;base64,' ? <div style={{height:'0px'}}></div> 
                                            : 
                                            <LazyLoad once={true} >
                                                <img className={styles.topicImg} src={topic.img} />
                                            </LazyLoad>
                                        }
                                    </div>
                                </div>
                            </Link>
                        <TopicFunction topic={topic} date={topic.date} time={topic.time} creator={topic.creator} likedby={topic.liked_by} likes={topic.likes} topic_id={topic.id} comments={topic.comment_count} />
                        {/* report component */}
                        {/* <Report topic={topic}  /> */}
                    </div>
                ))}
                {!loading ? (<>
                    {/* <button onClick={()=>prevPage()} disabled={prevBtnDisabled}>prev</button> */}
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <button style={{cursor:'pointer',width:'65%',borderRadius:'1rem',padding:'.5rem',background:'transparent',border:'.5px solid lightgrey'}} onClick={()=>olderTopics()}>Load more ...</button>
                        <button style={{cursor:'pointer', width:'30%',borderRadius:'1rem',padding:'.5rem',background:'transparent',border:'.5px solid lightgrey'}} onClick={()=>backToTop()}><IoMdArrowUp size={15}/></button>
                </div>
                </>):('')}
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

            {/* Add topic button */}
            <Link to='/create-topic'>
            <img className={styles.addTopic} src={addTopic} alt=""/>     
            </Link>
            <div className={toggle ? styles.reportModal + styles.active : styles.reportModal }>

            </div>
        </>
    );
}

export default Dashboard
