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
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-banner-image',{posterImgBase64,id:userDetails.id})
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
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-profile-image',{photoBase64,id:userDetails.id})
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
        if(res.data.success && res.data.done){ const ress = await axios.post('https://naij-react-backend.herokuapp.com/api/update-topic-creator-img',{img:res.data.pic,username:userDetails.username})}
    }

    // UPDATE USERNAME
    const updateUsername = async (e)=>{
        e.preventDefault();
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-username',{userName,id:userDetails.id})
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
            const ress = await axios.post('https://naij-react-backend.herokuapp.com/api/update-topic-creator',{oldusername:res.data.oldusername,newusername:res.data.newusername})
        }
    }

    const updateFullname = async(e)=>{
        e.preventDefault();
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-fullname',{fullName, id:userDetails.id})
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

    const updateDescription = async(e)=>{
        e.preventDefault()
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-description',{description, id:userDetails.id})
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

    const updateLocation = async(e)=>{
        e.preventDefault()
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-location',{location, id:userDetails.id})
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

    const updateUrl = async(e)=>{
        e.preventDefault()
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-url',{url, id:userDetails.id})
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

    const updatePassword = async(e)=>{
        e.preventDefault()
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/update-password',{password2, id:userDetails.id})
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
            <div className={styles.detailsForm}>
             <h3>Profile information</h3>
            <div style={{width:'100%',height:'1px',marginTop:'-.5rem',marginBottom:'30px',backgroundColor:'grey'}} />
            <label>Username</label>
            <p style={{fontSize:".8rem",color:'grey',margin:0}}>Your username is unique to your account</p>
            <form onSubmit={(e)=>updateUsername(e)}>
                <input
                    name="username"
                    placeholder="username"
                    value={userName}
                    onChange={e=>setUserName(e.target.value)}
                    maxLength="25"
                    minLength="5"
                    required
                />
                <button ><FaCheck color="white" /></button>
            </form>
            <p style={{fontSize:'.7rem',color:"grey"}}>{25 - userName.length} characters remaining (minimum of 5 characters)</p>


            <label>Fullname (Optional)</label>
            <p style={{fontSize:".8rem",color:'grey',margin:0}}>Your fullname will be dsiplayed on your profile.</p>
            <form onSubmit={(e)=>updateFullname(e)} >
                <input 
                    name="fullname"
                    placeholder="fullname"
                    value={fullName} 
                    onChange={e=>setFullName(e.target.value)}
                    maxLength="30"
                />
                <button><FaCheck color="white" /></button>
            </form>
            <p style={{fontSize:'.7rem',color:"grey"}}>{30 - fullName.length} characters remaining</p>


            <label>About (Optional)</label>
            <p style={{fontSize:".8rem",color:'grey',margin:0}}>Leave a description about yourself.</p>
            <form onSubmit={(e)=>updateDescription(e)} >
                <textarea 
                    placeholder="Description"
                    value={description} 
                    onChange={e=>setDescription(e.target.value)}
                    maxLength="200"
                />
                <button><FaCheck color="white" /></button>
            </form>
            <p style={{fontSize:'.7rem',color:"grey"}}>{200 - description.length} characters remaining</p>


            <label>Location (Optional)</label>
            <p style={{fontSize:".8rem",color:'grey',margin:0}}>Let your locations be known, this is not compulsory</p>
            <form onSubmit={(e)=>updateLocation(e)} >
                <input 
                    placeholder="location"
                    value={location} 
                    onChange={e=>setLocation(e.target.value)}
                    maxLength="25"
                />
                <button><FaCheck color="white" /></button>
            </form>
            <p style={{fontSize:'.7rem',color:"grey"}}>{25 - location.length} characters remaining</p>


            <label>Url (Optional)</label>
            <p style={{fontSize:".8rem",color:'grey',margin:0}}>This can be a link to your portfolio or personal website</p>
            <form onSubmit={(e)=>updateUrl(e)} >
                <input 
                    placeholder="location"
                    value={url} 
                    onChange={e=>setUrl(e.target.value)}
                    maxLength="35"
                />
                <button><FaCheck color="white" /></button>
            </form>
            <p style={{fontSize:'.7rem',color:"grey"}}>{35 - url.length} characters remaining</p>


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
                {/* <BsEye onClick={()=>showPassword()}/> */}
            </span>
            <label>New password</label>
            <p style={{fontSize:".8rem",color:'grey',margin:0}}>If your password is changed, remeber to login with the new one</p>
            <form onSubmit={(e)=>updatePassword(e)} >
                <input  
                    name="password"
                    type={isShowPassword2}
                    placeholder="new password"
                    value={password2} 
                    onChange={e=>setPassword2(e.target.value)}
                    minLength = "6"
                    maxLength="15"
                    required
                />
                {/* <BsEye onClick={()=>showPassword2()}/> */}
                <button><FaCheck color="white" /></button>
            </form>
            <p style={{fontSize:'.7rem',color:"grey"}}>{15 - password2.length} characters remaining (minimum of 6 characters)</p>
            </div>
        </div>
    )
}

export default Profile
