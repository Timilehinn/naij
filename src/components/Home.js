import React,{ useEffect, useState, useContext } from 'react'
import styles from '../styles/home.module.css'
import { BrowserRouter, Route, Switch, Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {AuthContext} from '../contexts/authContextApi'
import naijIcon from '../images/logo2.png'
import fileDownload from 'js-file-download';
import { ToastContainer, toast } from 'react-toastify';
import naijIcon2 from '../images/logo1.png'


function Home() {
    
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false)
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const history = useHistory();
    useEffect(()=>{
        let token = localStorage.getItem("frse_token");
      let email = localStorage.getItem("user_email");
        async function checkIsLoggedIn(e){
            if (token && email ) {
                axios.get(`http://localhost:3333/api/isUserAuth?email=${email}`, {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token":token,
                  },
                  // body: JSON.stringify({ token })
                })
                .then((res) => {
                  return res
                })
                .then((json) => {
                  console.log(json)
                  if (json.data.authenticated) {
                    setAuth(true);
                    setUserDetails(json.data.details)
                    // console.log(json.data.details,' the new logs i want to see')
                    history.push(`/timeline`)
                  }else{
                    setAuth(false);
                    localStorage.removeItem("frse_token");
                    localStorage.removeItem("user_email");
                  }
                })
                .catch((err) => {
                  setAuth(false);
                  console.log(err)
                  localStorage.removeItem("frse_token");
                })
                .then(() => setIsTokenValidated(true));
              } else {
                setIsTokenValidated(true); // in case there is no token
              }
        

        }
        checkIsLoggedIn();
    },[])
   if(loading){
       return <div style={{
            backgroundColor:'#f5f9e9',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'calc(10px + 2vmin)',
            width:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-around'
       }}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <img className={styles.bounce} src={naijIcon2} width="60px" height="70px"  />
                <p style={{color:'#5cab7d'}}>loading...</p>
            </div>
       </div>
   }

    return (
        <>
        <div className={styles.homeDiv}>
            {/* <div style={{backgroundColor:'#5cab7d',height:'50px',width:'100%',position:'fixed',top:0}}> */}
            <div className={styles.divOne} style={{paddingTop:'1.5rem',display:'flex',flexDirection:'column',alignItems:"center"}}>
            <ToastContainer />
                <h1 className={styles.naij_logo}>naijchat</h1>
                {/* <p className={styles.divOneP} > */}
                {/* </p> */}
                {/* <button onClick={()=>alert('The android app is no longer availbale for now.')} className={styles.downloadButton}>
                    Download for Android
                </button> */}
            </div>
            <div style={{paddingTop:'5rem'}} className={styles.buttonsForm}>
                {/* <img src={naijIcon} width="60px" height="70px"/> */}
                <p style={{textAlign:'center',color:'black',fontSize:'1.5rem', fontWeight:'lighter', lineHeight:'35px',userSelect:"none"}}>
                Join convserations, share topics, meet new people.

                </p>
                {/* LOGIN AND SIGN IN BUTTON */}
                <Link style={{textDecoration:'none'}} to="/signup" className={styles.button1}>
                  <p style={{fontSize:'.9rem',textDecoration:'none'}}>Sign Up</p>
                </Link>
                <Link style={{textDecoration:'none'}} to="/signin" className={styles.button2}>
                  <p style={{fontSize:'.9rem',textDecoration:'none'}}>Sign In</p>
                </Link>
                <footer style={{marginTop:'1.5rem'}}>
                    <p style={{textAlign:'center',userSelect:'none',fontSize:'.8rem',fontWeight:'200'}}>naijchat &copy; 2021, a product of <a href="https://www.pacavel.com">Pacavel</a></p>
                    {/* <p style={{textAlign:'center',userSelect:'none',fontSize:'.8rem',fontWeight:'200'}}>pacavel</p> */}
                </footer>
            </div>
          
        </div>
        
        </>
    )
}//ouytrewq     `257

export default Home

//5c7457 fern green
//0d160b dark jungle
//f5f9e9 ivory
//827081 old lavender
//cad5ca ash grey