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
                <div style={{display:'flex',marginLeft:'auto',marginRight:'auto',marginTop:'0rem',flexDirection:'column',alignItems:"flex-start"}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                        <img src={userDetails.poster_img} style={{width:'100%',margin:'0rem',height:"150px"}}/>
                        <div style={{marginLeft:'1.5rem'}}>
                            <Link to="/myprofile">
                                <img src={userDetails.img} style={{width:'70px',height:"70px",marginTop:'-2.3rem',borderRadius:'50%' }}/>
                            </Link>
                            <h4><span style={{color:'grey'}}>@{userDetails.username}</span>  {userDetails.verified =='true' ? <FaCheckCircle color="#5cab7d" /> : '' }</h4>
                        </div>
                    </div>
                    <div style={{display:'flex',alignItems:'flex-start',marginLeft:'1.5rem',flexDirection:'column '}}>
                            <Link style={{textDecoration:'none',color:'black'}} to={'/timeline'}><h3 style={{marginBottom:'.5rem'}}>Home</h3></Link>
                            <Link to="/create-topic" style={{textDecoration:'none',color:'black'}}><h3 style={{marginBottom:'.5rem'}}>Create Topic</h3></Link>
                            <Link style={{textDecoration:'none',color:'black'}}><h3 style={{marginBottom:'.5rem'}}>Get Verified</h3></Link>
                        <br/>
                        {/*  */}
                        <div className={styles.lowerSideBar}>
                            <h3 onClick={()=>alert('Naijchat is a topic sharing and group messaging platform ...')}>About</h3>
                            <h3 onClick={()=>alert('Lorem ipsum')}>Policy</h3>
                            <h3 style={{color:'orange'}} onClick={()=>{localStorage.removeItem('frse_token');localStorage.removeItem('user_email'); history.push('/')}}>logout</h3>
                            {/* <h3 onClick={()=>alert(Cookies.get('n_s_id'))}>chaeck state</h3> */}
                        </div>
                    </div>
                </div>
            </div> 
            <div className={styles.backmodal} onClick={()=>{setShowSideBar(-100); showBackModal('hidden')}} style={{visibility:backModal}}></div>
        </>
    )
}

export default Header;
