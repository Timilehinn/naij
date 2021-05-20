import React, { useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import styles from '../../styles/_bottomnav.module.css'
import { IoIosList, IoMdNotificationsOutline } from 'react-icons/io'
import { BiUser } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'


function Bottomnav() {

    const { userDetails, setUserDetails, notifCount, setNotifCount } = useContext(AuthContext);


    return (
        <div className={styles.bottomnav}>
            <Link to='/timeline'>
                <IoIosList color="#5cba7d" size={23} />
            </Link>
            <Link to="/search">
                <HiOutlineSearch color="#5cba7d" size={23} />
            </Link>

            <Link to="/create-topic">
                    <AiOutlinePlus size={25} color="#5cba7d" />
            </Link>
            <Link style={{color:'red',textDecoration:"none"}} to="/notifications">
                <span style={{display:'flex',marginBottom:'.3rem',justifyContent:'flex-start'}}>
                    <IoMdNotificationsOutline size={23} color="#5cba7d"/>
                    {notifCount === 0? '': <span style={{width:'5px',height:'5px',backgroundColor:'red',borderRadius:'50%'}}></span>}
                </span>
            </Link>
            <Link to="/myprofile">
                <BiUser color="#5cba7d" size={22} />
            </Link>
        </div>
    )
}

export default Bottomnav
