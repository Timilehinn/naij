import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/profile.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
// import Settings from './settings';
import Bottomnav from './_bottomnav'
import Header from './header'
import ReactFileReader from 'react-file-reader';
import { FaPen,FaTimes, FaCheck, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { BsEye , BsEyeSlash } from 'react-icons/bs'
import Navbar from './navbar'
import Linkify from 'react-linkify';
import Preview from '../utils/preview'
import { BiUser, BiGlobe, BiCheck } from 'react-icons/bi'
import { BsInfo } from 'react-icons/bs'
import { TiLocationOutline } from 'react-icons/ti'
import Modal from 'react-modal';


function Profile(props) {

    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ profileImg, setProfileImg ] = useState(userDetails.img)
    const [ posterProfileImg, setPosterProfileImg ]= useState(userDetails.poster_img)
    const [userTopics, setUserTopics ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [modalIsOpen,setIsOpen] = React.useState(false);


    useEffect(()=>{
        const getUserTopics = async ()=>{
            const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/user-topics?user=${userDetails.username}`)
            console.log(res)
            if(res.data.done){
                setLoading(false)
            }
            setUserTopics(res.data.topics)
        }
        getUserTopics()
    },[])

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          border:'.5px solid grey'
        }
      };
      function openModal() {
        setIsOpen(true);
      }
    
    
      function closeModal(){
        setIsOpen(false);
      }
  
    const deleteTopic = async (topic) =>{
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/delete-topic',{id:topic.id})
        if(res.data.done){
            toast.dark(res.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            });
        }
        if(res.data.success){
            const getUserTopics = async ()=>{
                const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/user-topics?user=${userDetails.username}`)
                console.log(res)
                if(res.data.done){
                    setLoading(false)
                }
                setUserTopics(res.data.topics)
            }
            getUserTopics()
        }
    }

    return (
        <div className={styles.divBody}>
        <Navbar />
        {/* <Header title="Profile" />*/}
        <ToastContainer />
            <div className={styles.row1}>
                <p style={{marginLeft:'1rem'}}>Your topics</p>
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
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <div style={{padding:'0rem'}}>
                                    <h3>Delete</h3>
                                    <p>Do you want to delete this topic?</p>
                                    <button onClick={()=>deleteTopic(topic)} style={{backgroundColor:'transparent',padding:'.3rem',width:'50%',border:'.5px solid grey'}}>yes <FaCheck /></button>
                                    <button onClick={()=>setIsOpen(false)} style={{backgroundColor:'transparent',padding:'.3rem',width:'50%',border:'.5px solid grey'}}>not <FaTimes /></button>
                                </div>
                            </Modal>
                            <button style={{backgroundColor:'transparent',padding:'.3rem',border:'.5px solid grey'}} onClick={()=>setIsOpen(true)}>Delete post</button>

                    </div>
                    ))}
            </div>
            <div className={styles.row2}>
                <div className={styles.posterdiv} style={{display:'flex',justifyContent:'center',backgroundSize:'cover',flexDirection:'column',alignItems:'center',width:'100%',backgroundImage:`url(${posterProfileImg})`}}>
                </div>
                <div style={{display:'flex',width:'95%',alignItems:'flex-start',flexDirection:'column',marginTop:'-2rem',marginLeft:'.3rem'}}>
                    <img src={profileImg} width="75px" height="75px" style={{borderRadius:'50%',backgroundColor:'white'}} />
                    {userDetails.fullname ? <h3>{userDetails.fullname}</h3> :<></>}
                    <p style={{display:'flex',alignItems:'center',fontSize:'.75rem',color:'grey',margin:'2px'}}><BiUser/> @{userDetails.username}</p>
                    {userDetails.description ? <Linkify><p style={{fontSize:'.7rem',margin:'2px'}}>{userDetails.description}</p></Linkify>:<></>}
                    {userDetails.location ? <p style={{display:'flex',alignItems:'center',fontSize:'.7rem', color:'grey',margin:0}}><TiLocationOutline /> {userDetails.location}</p> :<></>}
                    {userDetails.url ? <Linkify><p style={{display:'flex',alignItems:'center',fontSize:'.7rem', color:'grey'}}><BiGlobe /> {userDetails.url}</p></Linkify> :<p style={{margin:0}}></p>}
                    <p style={{display:'flex',alignItems:'center',fontSize:'.7rem',color:'grey',margin:'2px'}}>Joined {new Date(userDetails.createdAt).getUTCMonth()}/{new Date(userDetails.createdAt).getFullYear()}</p>
                    <Link to="settings/editprofile" style={{textDecoration:'none', fontSize:'.65rem',color:'grey',padding:'.5rem',border:'.5px solid grey',borderRadius:'.8rem',backgroundColor:'transparent'}}>edit profile</Link>
                </div>
            </div>
            <Bottomnav />
        </div>
    )
}

export default Profile
