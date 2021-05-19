import React,{ useState, useContext } from 'react'
import styles from '../../styles/navbar.module.css'
import { FaPen, FaCheckCircle, FaCog } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'
import { useMediaQuery } from 'react-responsive'
import Logo from '../../images/logo1.png'
import Cookies from 'js-cookie'
import { IoMdAddCircle,IoIosList, IoMdAddCircleOutline} from 'react-icons/io'
import { BiLogOutCircle } from 'react-icons/bi'
import { RiArrowDownSLine } from 'react-icons/ri'
import { ImProfile } from 'react-icons/im'
import { HiOutlineCog } from 'react-icons/hi'
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import loupe from '../../images/loupe.png'
import check from '../../images/check.png'
import whitelogo from '../../images/whitelogo.png'

function NavDropDown(prop){
    const history = useHistory();

    const {auth, setAuth,userDetails,setUserDetails} = useContext(AuthContext);
   
    function profile(){ history.push('/myprofile') }
    function timeline(){ history.push('/timeline') }
    function userSettings(){ history.push('/settings/editprofile') }
    function about(){ alert('Naijchat is a topic sharing and group messaging platform ...') }
    function signOut(){
        history.push('/signin')
        localStorage.removeItem('frse_token');
        localStorage.removeItem('user_email');
    }
    return (
        <div className={styles.dropdown} style={{display:prop.state}}>
            <div style={{userSelect:'none', marginTop:'1rem'}}>
                <span onClick={()=>timeline()} style={{color:'black',textDecoration:'none',fontSize:'.9rem',fontWeight:'bold',display:'flex',alignItems:'center'}} to='/myprofile'>
                    <IoIosList/>Timeline
                </span>
                <span onClick={()=>profile()} style={{color:'black',textDecoration:'none',fontSize:'.9rem',fontWeight:'bold',display:'flex',alignItems:'center'}} to='/myprofile'>
                    <BiUser/>Profile
                </span>
                <span onClick={()=>userSettings()} style={{color:'black',textDecoration:'none',fontSize:'.9rem',fontWeight:'bold',display:'flex',alignItems:'center'}} to="/settings/editprofile">
                    <HiOutlineCog/>User Settings
                </span>
                <span style={{color:'black',textDecoration:'none',fontSize:'.9rem',fontWeight:'bold',display:'flex',alignItems:'center'}}>
                    <AiOutlineCheckCircle />Get Verified
                </span>
                <span onClick={()=>about()} style={{color:'black',textDecoration:'none',fontSize:'.9rem',fontWeight:'bold',display:'flex',alignItems:'center'}}>
                    <AiOutlineInfoCircle/>About
                </span>
                <span onClick={()=>signOut()} style={{color:'black',textDecoration:'none',fontSize:'.9rem',fontWeight:'bold',display:'flex',alignItems:'center'}}>
                    <BiLogOutCircle />Logout
                </span>
            </div>
        </div>
    )
}


function Header(props) {
    const {auth, setAuth,userDetails,setUserDetails} = useContext(AuthContext);
    const [ showSideBar, setShowSideBar ] = useState(-100);
    const [ backModal, showBackModal ] = useState('hidden');
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
      })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    if(isDesktopOrLaptop ||isBigScreen ){
        // setShowSideBar('-100');
        // showBackModal('none');
    }
    const [ navDropDownState, setNavDropDownState ] = useState('none')
    
    function dropDownState(){
        if(navDropDownState === 'none'){
            setNavDropDownState('flex')
        }else{
            setNavDropDownState('none')
        }
    }
    return (
         
        <div className={styles.nav}>
            <img src={whitelogo} width="40px" height="45px" />
            <div className={styles.inputBox}>
                <img src={loupe} alt=""/>
                <input placeholder="Search" className={styles.search} />  
            </div>
            {/* <img className={styles.check} src={check} alt=""/> */}
            <div onClick={()=>dropDownState()} style={{userSelect:'none', cursor:'pointer',display:'flex',justifyContent:'space-around', border:'1px solid grey',width:'220px',height:'40px',borderRadius:'.3rem',alignItems:"center", flexDirection:'row',marginRight:'1rem'}}>
                <h5 style={{margin:'0'}}>@{userDetails.username} {userDetails.verified =='true' ? <FaCheckCircle color="#5cab7d" /> : '' }</h5>
                <img src={userDetails.img} style={{width:'30px',marginLeft:'2rem',height:"30px",borderRadius:'50%' }}/>
                <RiArrowDownSLine />

            </div>
            <NavDropDown state ={navDropDownState} />
        </div>
    )
}

export default Header;
