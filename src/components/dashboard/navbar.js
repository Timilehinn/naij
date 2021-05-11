import React,{ useState, useContext } from 'react'
import styles from '../../styles/navbar.module.css'
import { FaPen, FaCheckCircle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'
import { useMediaQuery } from 'react-responsive'
import Logo from '../../images/logo1.png'
import Cookies from 'js-cookie'

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
    return (
        <div className={styles.nav}>
            <img src={Logo} width="40px" height="45px" />
            <select className={styles.select}  >
                <option>lorem 1</option>
                <option>lorem 2</option>
                <option>lorem 4</option>
            </select>
            <input placeholder="Search" className={styles.search} />
            <FaCheckCircle color="grey" size={20} />
            <FaPen color="grey" size={20} />
            <div style={{display:'flex',flexDirection:'row',marginRight:'1rem'}}>
                <div style={{display:'flex',flexDirection:'column',marginRight:'1rem'}}>
                    <p style={{fontSize:'.9rem',margin:'0',color:'grey'}}>{userDetails[0].email}</p>
                    <h4 style={{margin:'0'}}>@{userDetails[0].fullname}</h4>
                </div>
                <img src={userDetails[0].img} style={{width:'40px',height:"40px",borderRadius:'50%' }}/>
            </div>
        </div>
    )
}

export default Header;
