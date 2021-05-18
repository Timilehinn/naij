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
import { FaPen, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { BsEye , BsEyeSlash } from 'react-icons/bs'
import Navbar from './navbar'


function Profile(props) {

    const [ photo, setPhoto ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ profileImg, setProfileImg ] = useState(userDetails.img)
    const [ topics, setTopics ] = useState([]);
    const [ switchPage, setSwitchPage ] = useState('home')
    const [fullName,setFullName] = useState(userDetails.fullname);
    const [userName,setUserName] = useState(userDetails.username);
    const [email,setEmail] = useState(userDetails.email);
    const [password,setPassword] = useState(userDetails.password);
    const [ posterImg, setPosterImg ]= useState('')
    const [ posterImgBase64, setPosterImgBase64 ] = useState('')
    const [ posterProfileImg, setPosterProfileImg ]= useState(userDetails.poster_img)
    const [ isShowPassword, setIsShowPassword ] = useState('password')
 
    function showPassword(){
        if(isShowPassword === 'password'){
            setIsShowPassword('text')
        }else{
            setIsShowPassword('password')
        }
    }
    function changePosterImage(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPosterImg(e.base64)
        setPosterImgBase64(pre_removed)
        setPosterProfileImg(e.base64)
        // setPreview_img_display('block')
    }


    function handleFiles(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setProfileImg(e.base64)
        // setPreview_img_display('block')
    }

    const updateProfileImage = async ()=>{
        // updates only profile image
        if(photoBase64 !== '' && posterImgBase64 === ''){
            const res = await axios.post('http://localhost:3333/api/update-profile-image',
            {photoBase64,posterImgBase64,id:userDetails.id,creator_email:userDetails.email})
            console.log(res.data,' the data here')
            setUserDetails(res.data.details)
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
            }else{
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
        // updates poster profile image
        }else if(posterImgBase64 !== '' && photoBase64 === ''){
            const res = await axios.post('http://localhost:3333/api/update-profile-poster-image',
            {photoBase64,posterImgBase64,id:userDetails.id,creator_email:userDetails.email})
            console.log(res.data,' the data here')
            setUserDetails(res.data.details)
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
            }else{
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
        }else{
            // updates both
            const res = await axios.post('http://localhost:3333/api/update-profile-images',
            {photoBase64,posterImgBase64,id:userDetails.id,creator_email:userDetails.email})
            console.log(res.data,' the data here')
            setUserDetails(res.data.details)
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
            }else{
                toast.warning(res.data.message, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                });
            }
        }
    }

    // to update username, fullname, password and email    
    const updateProfile = async ()=>{
        const res = await axios.post('http://localhost:3333/api/update-profile-web',{id:userDetails.id,userName,password,fullName})
        // console.log(res.data)
        if(res.data.success){
            toast.dark(res.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            });
        }else{
            toast.error(res.data.message,{
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
        }
    }


    return (
        <div className={styles.divBody}>
        <Navbar />
        <Header title="Settings" />                             
        <ToastContainer />
            <div className={styles.row1}>
                <ReactFileReader handleFiles={e=>changePosterImage(e)} base64={true}>
                    <img src={posterProfileImg} width="100%" height='150px' />
                </ReactFileReader>
                <div style={{display:'flex',marginTop:'-3rem',flexDirection:'row',alignItems:'flex-end'}}>
                    <img src={profileImg} width="100px" height="100px" style={{borderRadius:'50%',backgroundColor:'white'}} />
                    <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                        <span style={{marginLeft:'-1rem',cursor:'pointer'}}><FaPen color="#5cab7d" size={15} /></span>
                    </ReactFileReader>
                </div>
                <button onClick={()=>updateProfileImage()} style={{marginTop:'1.7rem',border:'5px solid green',fontWeight:'bold',borderRadius:'3rem',padding:'.6rem',backgroundColor:'#5cab7d'}}>Update Image</button>
                 <p>Edit Details</p>
                 <div className={styles.detailsForm}>
                    <input 
                        style={{width:'auto',paddingLeft:'15px',height:'40px',border:'.5px solid #5cab7d',borderRadius:'30px',marginBottom:'10px'}}
                        name="username"
                        placeholder="username"
                        value={userName}
                        onChange={e=>setUserName(e.target.value)}
                    />
                     <input 
                        style={{width:'auto',paddingLeft:'15px',height:'40px',border:'.5px solid #5cab7d',borderRadius:'30px',marginBottom:'10px'}}
                        name="fullname"
                        placeholder="fullname"
                        value={fullName} 
                        onChange={e=>setFullName(e.target.value)}
                    />
                     {/* <input 
                        style={{width:'auto',paddingLeft:'15px',height:'40px',border:'.5px solid #5cab7d',borderRadius:'30px',marginBottom:'10px'}} 
                        name="email"
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                    /> */}
                    <span style={{display:'flex',cursor:"pointer",alignItems:'center'}}>
                     <input  
                        style={{width:'95%',paddingLeft:'15px',height:'40px',border:'.5px solid #5cab7d',borderRadius:'30px',marginBottom:'10px'}} 
                        name="password"
                        type={isShowPassword}
                        placeholder="password"
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                    />
                        <BsEye onClick={()=>showPassword()} style={{position:'relative',float:'right',marginBottom:'.7rem',marginLeft:'-2rem'}} />
                    </span>
                     <button onClick={()=>updateProfile()} style={{width:'auto',borderRadius:'30px',fontWeight:'bold',height:'45px',backgroundColor:'#5cab7d',border:'.5px solid #5cab7d',border:'5px solid green',marginBottom:'10px'}}>Update Details</button>
                 </div>
            </div>
            <div className={styles.row2}>
                    {/* <input style={{width:'80%', height:'30px',borderRadius:'5rem',border:'.5px solid green'}} /> */}
            </div>
            <Bottomnav />
        </div>
    )
}

export default Profile
