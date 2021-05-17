import React,{ useState, useContext } from 'react'
import styles from '../../styles/header.module.css'
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'
import {ThemeContext} from '../../contexts/themeContextApi'
import { useMediaQuery } from 'react-responsive'
import { IoMdStar } from 'react-icons/io'
import Cookies from 'js-cookie'

function Header(props) {
    const history = useHistory();
    const {auth, setAuth,userDetails,setUserDetails} = useContext(AuthContext);
    const {darkMode,setDarkMode,isEnabled, setIsEnabled} = useContext(ThemeContext);
    const [ showSideBar, setShowSideBar ] = useState(-100);
    const [ backModal, showBackModal ] = useState('hidden');
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
      })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
    if(isDesktopOrLaptop ||isBigScreen ){
        // setShowSideBar('-100');
        // showBackModal('none');
    }

    const toggleSwitch = async () => {
        if(!isEnabled){
          setIsEnabled(true)
          setDarkMode({backgroundColor:'#101820ff',color:'white',border:'#01452c'})
            try {
              const themeValue = JSON.stringify({backgroundColor:'#101820ff',color:'white',border:'#01452c',enabled:true})
              await localStorage.setItem('@naij_theme_key', themeValue)
              console.log('dark theme saved')
            }catch (e) {
                console.log('error setting theme',e)
            }
        }else{
          setIsEnabled(false)
          setDarkMode({ backgroundColor:'white',color:'black',border:'lightgrey' });
            try {
              const themeValue = JSON.stringify({ backgroundColor:'white',color:'black',border:'lightgrey',enabled:false })
              await localStorage.setItem('@naij_theme_key', themeValue)
              console.log('light theme saved')
            }catch (e) {
                console.log('error setting theme',e)
            }
        }
      }



    return (
        <>
            <div className={styles.header}>
                <img onClick={()=>{setShowSideBar('0'); showBackModal('visible')}} src={userDetails.img} style={{marginLeft:'.5rem',backgroundColor:'violet',width:'35px',height:'35px',borderRadius:'50%'}} />
                <h3 style={{marginRight:'.5rem'}}>{props.title}</h3>
            </div>
            
            <div className={styles.sidebar} style={{zIndex:'1',overflowX:'scroll',transform:`translateX(${showSideBar}%)`}}>
                <div style={{display:'flex',marginLeft:'auto',marginRight:'auto',marginTop:'2rem',flexDirection:'column',alignItems:"center"}}>
                    {/* {userDetails.map(dets=>( */}
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <img src={userDetails.img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                                <h4>@{userDetails.username}  {userDetails.verified =='true' ? <FaCheckCircle color="#5cab7d" /> : '' }</h4>
                                <p style={{fontSize:'.9rem',color:'grey'}}>{userDetails.email}</p>
                             
                        </div>
                    {/* ))} */}
                    {/* <p>{Cookies.get('n_s_id')}</p> */}
                    
                    <div style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
                        <h4 style={{fontWeight:'bold', color:"#5cab7d", fontStyle:"italic"}}>karma - 79  </h4>
                        <IoMdStar color="#5cab7d" size={15} />
                    </div>
                        <Link style={{textDecoration:'none',color:'black'}} to={'/timeline'}><h2>Home</h2></Link>
                        {/* <Link to="/create-topic" style={{textDecoration:'none',color:'black'}}><h2>Create Topic</h2></Link> */}
                        <Link style={{textDecoration:'none',color:'black'}}><h2>Your Topics</h2></Link>
                        <Link style={{textDecoration:'none',color:'black'}}><h2>Get Verified</h2></Link>
                        <Link style={{textDecoration:'none',color:'black'}} to="/settings"><h2>Settings</h2></Link>
                    <br/>
                    {/*  */}
                    <div className={styles.lowerSideBar}>
                        <h3 onClick={()=>alert('fuck u')}>About</h3>
                        <h3 onClick={()=>alert('fuck u')}>Policy</h3>
                        <h3 style={{color:'orange'}} onClick={()=>{localStorage.removeItem('frse_token');localStorage.removeItem('user_email'); history.push('/')}}>logout</h3>
                        {/* <h3 onClick={()=>alert(Cookies.get('n_s_id'))}>chaeck state</h3> */}
                    </div>
                
                </div>
            </div> 
            <div className={styles.backmodal} onClick={()=>{setShowSideBar(-100); showBackModal('hidden')}} style={{visibility:backModal}}></div>
        </>
    )
}

export default Header;
