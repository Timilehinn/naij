import React, { useState, useContext, useEffect } from 'react'
import styles from '../styles/register.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,Redirect,useHistory } from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from '../contexts/authContextApi'
import Cookies from 'js-cookie';
import naijIcon from '../images/logo2.png'
import Preloader from './utils/preloader'
import rug from 'random-username-generator';
// import { css } from 'glamor'


function Register() {

    rug.setSeperator('_');  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPwrd, setIsShowPwrd] = useState('password');
    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ isLoading, setIsLoading ] = useState(false)
    const [ username, setUsername ] = useState(rug.generate().substring(0,15)) 
    const [ isUsernameValid, setIsUsernameValid ] = useState(true) 
    const [ btnState, setBtnState ] = useState(false)


    function validateUsername(e){
        setUsername(e)
        // to make sure the username is valid
        if(e.match(/^[a-zA-Z0-9_]{1,15}$/)){
            console.log('matcch')
            setIsUsernameValid(true)
            setBtnState(false)
        }else{
            console.log('no match')
            setIsUsernameValid(false)
            setBtnState(true)
        }
    }


    async function authenticateUser(e){
        setIsLoading(true)
        e.preventDefault();
        const registerRes = await axios.post('http://localhost:3333/api/register',{email,username,password});
        console.log(registerRes.data)
        const msg = <p style={{fontSize:'.85rem'}}>{registerRes.data.msg}</p>

      
        if(registerRes.data.success){
                console.log('aw far')
                setIsLoading(false)
                const loginRes = await axios.post('http://localhost:3333/api/login',{email,password})
                setAuth(loginRes.data.session);
                setUserDetails(loginRes.data.details);
                // console.log(loginRes.data.auth_msg);
                // console.log(auth,' this is my auth');
                // console.log(loginRes.data.session,' this is my session');

                if(loginRes.data.session){
                    // setLoginState(true)
                    //INITIATE SESSION ID
                    localStorage.setItem("frse_token",loginRes.data.token);
                    localStorage.setItem("user_email",loginRes.data.email);
                    // localStorage.setItem("user_det",JSON.stringify(loginRes.data.details));
                    setUserDetails(loginRes.data.details)
                    setAuth(loginRes.data.authenticated)
                    // history.push('/meet')
                    history.push(`/timeline`)
                }else{
                    history.push('/signup')
                }
                
        }else{

            setIsLoading(false)
            toast.dark(msg,{
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true, 
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
    }
    return (
        <div className={styles.divOne}>
            <form className={styles.form} onSubmit={(e)=>authenticateUser(e)}>
                <img src={naijIcon} width="80px" height="90px" style={{alignSelf:'center'}} />
                <h2 style={{textAlign:'center',userSelect:'none',color:'white'}}>Sign Up</h2>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required/>
                <input type="text" value={username} maxLength={15} onChange={e=>validateUsername(e.target.value)} placeholder="username" required/>
                <div style={{width:"300px",paddingLeft:'1rem', wordBreak:'break-word'}}>
                    <p style={{fontSize:'.7rem',color:isUsernameValid ? 'grey' : 'red'}}>{isUsernameValid ? 'A randomly generated usename.' : 'Your username must be 15 characters or less and contain ony letters, numbers, and underscores and no spaces'}</p>
                </div>
                <input minLength="6" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type={isShowPwrd} required/>
                <button disabled={btnState} style={{cursor:btnState ? 'not-allowed! important' : 'pointer', display:'flex',justifyContent:'center',flexDirection:"row",alignItems:'center',color:'white',fontWeight:'bold'}}>
                    Sign Up {isLoading? <Preloader /> :''}
                </button>
                <Link to="/signin" style={{textDecoration:'none',color:'white'}}>
                    <p style={{textAlign:'center',fontSize:'1rem'}}>Already registered? Sign In</p></Link>
            </form>
            <div style={{position:'absolute'}}><ToastContainer position="top-center"/></div>

        </div>
    )
}

export default Register
