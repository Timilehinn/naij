import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../../styles/profile.module.css';
import axios from 'axios';
import User_home from '../user_home'
import Create_topic from '../create_topic';
// import Settings from './settings';
import Bottomnav from '../_bottomnav'
import Header from '../header'
import ReactFileReader from 'react-file-reader';
import { FaPen,FaTimes, FaCheck, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { BsEye , BsEyeSlash } from 'react-icons/bs'
import Navbar from '../navbar'
import Linkify from 'react-linkify';
import { BiUser, BiGlobe, BiCheck } from 'react-icons/bi'
import { BsInfo } from 'react-icons/bs'
import { TiLocationOutline } from 'react-icons/ti'
import Modal from 'react-modal';
import ProfileTabs from './profiletabs'

function Profile(props) {

    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ profileImg, setProfileImg ] = useState(userDetails.img)
    const [ posterProfileImg, setPosterProfileImg ]= useState(userDetails.poster_img)
    const [userTopics, setUserTopics ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [modalIsOpen,setIsOpen] = React.useState(false);


    // useEffect(()=>{
    //     const getUserTopics = async ()=>{
    //         const res = await axios.get(`http://localhost:3333/api/user-topics?user=${userDetails.username}`)
    //         console.log(res)
    //         if(res.data.done){
    //             setLoading(false)
    //         }
    //         setUserTopics(res.data.topics)
    //     }
    //     getUserTopics()
    // },[])

    
  
   
    return (
        <div className={styles.divBody}>
        <Navbar />
        {/* <Header title="Profile" />*/}
        <ToastContainer />
            <div className={styles.row1}>
            <ProfileTabs />
                
            </div>
            <div className={styles.row2}>
                <div className={styles.posterdiv} style={{display:'flex',justifyContent:'center',backgroundSize:'cover',flexDirection:'column',alignItems:'center',width:'100%',backgroundImage:`url(${posterProfileImg})`}}>
                </div>
                <div style={{display:'flex',width:'95%',alignItems:'flex-start',flexDirection:'column',marginTop:'-2rem',marginLeft:'.3rem'}}>
                    <span>
                        <img src={profileImg} width="75px" height="75px" style={{borderRadius:'50%',backgroundColor:'white'}} />{userDetails.verified ?<FaCheckCircle color="#5cab7d" /> :<></>}
                    </span>
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
