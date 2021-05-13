import React,{ useState, useContext } from 'react'
import styles from '../../styles/navbar.module.css'
import { FaPen, FaCheckCircle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'
import { useMediaQuery } from 'react-responsive'
import Logo from '../../images/logo1.png'
import Cookies from 'js-cookie'
import { IoMdAddCircle, IoMdAddCircleOutline } from 'react-icons/io'

function Header(props) {
    const history = useHistory();
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
    function signOut(){
        history.push('/signin')
        localStorage.removeItem('frse_token')
        localStorage.removeItem('user_email')
    }
    return (
        <div className={styles.nav}>
            <img src={Logo} width="40px" height="45px" />
            {/* {userDetails} */}

            <select className={styles.select}  >
                <option>lorem 1</option>
                <option>lorem 2</option>
                <option>lorem 4</option>
            </select>
            <p onClick={()=>signOut()}  >logout</p>
            <input placeholder="Search" className={styles.search} />
            <Link>
                <FaCheckCircle color="grey" size={20} />
            </Link>
            <Link to='/create-topic' style={{textDecoration:'none',color:'black'}}>
                <IoMdAddCircleOutline color="grey" size={25} />
            </Link>
           
            <div style={{display:'flex',flexDirection:'row',marginRight:'1rem'}}>
                <div style={{display:'flex',flexDirection:'column',marginRight:'1rem'}}>
                    <p style={{fontSize:'.9rem',margin:'0',color:'grey'}}>{userDetails[0].email}</p>
                    <h4 style={{margin:'0'}}>@{userDetails[0].fullname} {userDetails[0].verified ? <FaCheckCircle color="#5cab7d" /> : '' }</h4>
                </div>
                <img src={userDetails[0].img} style={{width:'40px',height:"40px",borderRadius:'50%' }}/>
            </div>
        </div>
    )
}

export default Header;
