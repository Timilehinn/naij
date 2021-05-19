import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/editprofile.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
// import Settings from './settings';
import Bottomnav from './_bottomnav'
import Header from './header'
import ReactFileReader from 'react-file-reader';
import { FaPen,FaCheck, FaCheckCircle } from 'react-icons/fa';
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
    const [password2,setPassword2] = useState('');
    const [ posterImg, setPosterImg ]= useState('')
    const [ posterImgBase64, setPosterImgBase64 ] = useState('')
    const [ posterProfileImg, setPosterProfileImg ]= useState(userDetails.poster_img)
    const [ isShowPassword, setIsShowPassword ] = useState('password')
    const [ isShowPassword2, setIsShowPassword2 ] = useState('password')
    const [ description, setDescription ] = useState(userDetails.description)
    const [ location, setLocation ] = useState(userDetails.location)
    const [ url, setUrl ] = useState(userDetails.url)
 

    // SHOW AND HIDE CURRENT PASSWORD AND NEW PASSWORD
    function showPassword(){
        if(isShowPassword === 'password'){setIsShowPassword('text')}
        else{setIsShowPassword('password')}
    }

    function showPassword2(){
        if(isShowPassword2 === 'password'){setIsShowPassword2('text')}
        else{setIsShowPassword2('password')}
    }


    // POSTER SELECT AND UPDATE
    function changePosterImage(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPosterImg(e.base64)
        setPosterImgBase64(pre_removed)
        setPosterProfileImg(e.base64)
        // setPreview_img_display('block')
    }
    const updateBannerImage = async ()=>{
        const res = await axios.post('http://localhost:3333/api/update-banner-image',{posterImgBase64,id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
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

    // PROFILE PICTURE SELECT AND UPDATE
    function changeProfilePic(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setProfileImg(e.base64)
    }
    const updateProfileImage = async ()=>{
        const res = await axios.post('http://localhost:3333/api/update-profile-image',{photoBase64,id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
        }
        if(res.data.success){ const ress = await axios.post('http://localhost:3333/api/update-topic-creator-img',{img:res.data.pic,username:userDetails.username})}
    }

    // UPDATE USERNAME
    const updateUsername = async ()=>{
        const res = await axios.post('http://localhost:3333/api/update-username',{userName,id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
        }
        if(res.data.success){
            const ress = await axios.post('http://localhost:3333/api/update-topic-creator',{oldusername:res.data.oldusername,newusername:res.data.newusername})
        }
    }

    const updateFullname = async()=>{
        const res = await axios.post('http://localhost:3333/api/update-fullname',{fullName, id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
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

    const updateDescription = async()=>{
        const res = await axios.post('http://localhost:3333/api/update-description',{description, id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
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

    const updateLocation = async()=>{
        const res = await axios.post('http://localhost:3333/api/update-location',{location, id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
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

    const updateUrl = async()=>{
        const res = await axios.post('http://localhost:3333/api/update-url',{url, id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
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

    const updatePassword = async()=>{
        const res = await axios.post('http://localhost:3333/api/update-password',{password2, id:userDetails.id})
        if(res.data.done){
            toast.dark(res.data.message,{
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
        {/* <Navbar /> */}   
        {/* <Header title="Profile" />*/}
        <ToastContainer />
        
               
                    {/* <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                        <span style={{marginLeft:'-1rem',cursor:'pointer'}}><FaPen color="#5cab7d" size={15} /></span>
                    </ReactFileReader> */}
                {/* <button onClick={()=>updateProfileImage()} style={{marginTop:'1.7rem',border:'5px solid green',fontWeight:'bold',borderRadius:'3rem',padding:'.6rem',backgroundColor:'#5cab7d'}}>Update Image</button> */}
                 <div className={styles.detailsForm}>
                 <h3>Profile information</h3>
                    <div style={{width:'100%',height:'1px',marginTop:'-.5rem',marginBottom:'30px',backgroundColor:'grey'}} />
                    <label>Username</label>
                    <span style={{width:'100%',display:'flex',alignItems:"center"}}>
                        <input
                            name="username"
                            placeholder="username"
                            value={userName}
                            onChange={e=>setUserName(e.target.value)}
                        />
                        <button onClick={()=>updateUsername()}><FaCheck color="#5cab7d" /></button>
                    </span>
                    <p style={{fontSize:".8rem",color:'grey'}}>Your username is unique to your account</p>


                    <label>Fullname (Optional)</label>
                    <span style={{width:'100%',display:'flex',alignItems:"center"}}>
                        <input 
                            name="fullname"
                            placeholder="fullname"
                            value={fullName} 
                            onChange={e=>setFullName(e.target.value)}
                        />
                        <button onClick={()=>updateFullname()}><FaCheck color="#5cab7d" /></button>
                    </span>
                    <p style={{fontSize:".8rem",color:'grey'}}>Your fullname is Optional</p>


                    <label>Description (Optional)</label>
                    <span style={{display:'flex',width:'100%',display:'flex',alignItems:"flex-start"}}>
                        <textarea 
                            placeholder="Description"
                            value={description} 
                            onChange={e=>setDescription(e.target.value)}
                        />
                        <button onClick={()=>updateDescription()}><FaCheck color="#5cab7d" /></button>
                    </span>
                    <p style={{fontSize:".8rem",color:'grey'}}>Leave a description about yourself.</p>


                    <label>Location (Optional)</label>
                    <span style={{width:'100%',display:'flex',alignItems:"center"}}>
                        <input 
                            placeholder="location"
                            value={location} 
                            onChange={e=>setLocation(e.target.value)}
                        />
                        <button onClick={()=>updateLocation()}><FaCheck color="#5cab7d" /></button>
                    </span>
                    <p style={{fontSize:".8rem",color:'grey'}}>Let your locations be known, this is not compulsory</p>


                    <label>Url (Optional)</label>
                    <span style={{width:'100%',display:'flex',alignItems:"center"}}>
                        <input 
                            placeholder="locations"
                            value={url} 
                            onChange={e=>setUrl(e.target.value)}
                        />
                        <button onClick={()=>updateUrl}><FaCheck color="#5cab7d" /></button>
                    </span>
                    <p style={{fontSize:".8rem",color:'grey'}}>This can be a link to your portfolio or personal website</p>

                    <h3>Images</h3>
                    <p style={{fontSize:".8rem",color:'grey',marginTop:"-1rem"}}>Profile image and banner image.</p>
                    <div style={{width:'100%',height:'1px',marginTop:'-.5rem',marginBottom:'30px',backgroundColor:'grey'}} />
                    <div className={styles.images} >
                        <span>
                            <ReactFileReader handleFiles={e=>changeProfilePic(e)} base64={true}>
                                <img src={profileImg} style={{width:'100px',height:'100px',borderRadius:'50%'}} />
                            </ReactFileReader>
                            <button onClick={()=>updateProfileImage()}>save</button>
                        </span>
                        <span>
                            <ReactFileReader handleFiles={e=>changePosterImage(e)} base64={true}>
                                <img src={posterProfileImg} width="300px" height="200px" />
                            </ReactFileReader>
                            <button onClick={()=>updateBannerImage()}>save</button>
                        </span>
                    </div>

                    <h3>Password</h3>
                    <p style={{fontSize:".8rem",color:'grey',marginTop:"-1rem"}}>Profile image and banner image.</p>
                    <div style={{width:'100%',height:'1px',marginTop:'-.5rem',marginBottom:'30px',backgroundColor:'grey'}} />

                    <label>Current password</label>
                    <span style={{width:'100%',display:'flex',alignItems:"center", marginBottom:'1rem'}}>
                        <input  
                            name="password"
                            type={isShowPassword}
                            placeholder="password"
                            value={password} 
                            onChange={e=>setPassword(e.target.value)}
                        />
                        <BsEye onClick={()=>showPassword()}/>
                    </span>
                    <label>New password</label>
                    <span style={{width:'100%',display:'flex',alignItems:"center"}}>
                        <input  
                            name="password"
                            type={isShowPassword2}
                            placeholder="new password"
                            value={password2} 
                            onChange={e=>setPassword2(e.target.value)}
                        />
                        <BsEye onClick={()=>showPassword2()}/>
                        <button onClick={()=>updatePassword()}><FaCheck color="#5cab7d" /></button>
                    </span>
                    <p style={{fontSize:".8rem",color:'grey'}}>If your password is changed, remeber to login with the new one</p>
                     {/* <button onClick={()=>updateProfile()} style={{width:'auto',borderRadius:'30px',fontWeight:'bold',height:'45px',backgroundColor:'#5cab7d',border:'.5px solid #5cab7d',border:'5px solid green',marginBottom:'10px'}}>Update Details</button> */}
                 </div>
                    {/* <input style={{width:'80%', height:'30px',borderRadius:'5rem',border:'.5px solid green'}} /> */}
        </div>
    )
}

export default Profile
