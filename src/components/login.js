import React, { useState, useContext, useEffect } from 'react'
import styles from '../styles/login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,Redirect,useHistory } from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from '../contexts/authContextApi'
import Cookies from 'js-cookie';
import naijIcon from '../images/logo1.png'
import Preloader from './utils/preloader'

function Login(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPwrd, setIsShowPwrd] = useState('password');
    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [loginState , setLoginState] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false)

    
    async function authenticateUser(e){
                setIsLoading(true)
                e.preventDefault();
                console.log('aw far')
                var loginRes = await axios.post('https://naij-react-backend.herokuapp.com/api/login',{email,password})
                const msg = <p style={{fontSize:'.85rem'}}>{loginRes.data.auth_msg}</p>
                toast.info(msg,{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                console.log(loginRes)
                if(loginRes.data.session){
                    setLoginState(true)
                    setIsLoading(false)
                    //INITIATE SESSION ID
                    localStorage.setItem("frse_token",loginRes.data.token);
                    localStorage.setItem("user_email",loginRes.data.email);
                    // localStorage.setItem("user_det",JSON.stringify(loginRes.data.details));
                    setUserDetails(loginRes.data.details)
                    setAuth(loginRes.data.authenticated)
                    // history.push('/meet')
                    history.push(`/timeline`)
                }else{
                    setLoginState(false)
                    history.push('/signin')
                }
    }
 
    return (
        <div className={styles.divOne}>
            <form className={styles.form} onSubmit={(e)=>authenticateUser(e)}>
                 <img src={naijIcon} width="60px" height="70px" style={{alignSelf:'center'}} />
                <h2 style={{textAlign:'center',userSelect:'none',color:'#5cab7d'}}>Sign In</h2>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required />
                <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type={isShowPwrd} required />
                <button style={{display:'flex',justifyContent:'center',flexDirection:"row",alignItems:'center',color:'white',fontWeight:'bold'}}>
                    Sign In {isLoading? <Preloader /> :''}
                </button>
                <Link to="/signup" style={{textDecoration:'none',color:'#5cab7d'}}>
                    <p style={{textAlign:'center',fontSize:'1rem'}}>No Account? Register.</p></Link>
                
            </form>
            <div style={{position:'absolute'}}><ToastContainer position="top-center"/></div>

        </div>
    )
}

export default Login
