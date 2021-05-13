import React,{ useContext } from 'react'
import styles from '../../styles/_bottomnav.module.css'
import { FaHome, FaSearch, FaEnvelope, FaCog, FaPlus, FaBeer } from 'react-icons/fa';
import { IoMdAddCircle, IoMdAddCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'


function Bottomnav() {

    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);


    return (
        <div className={styles.bottomnav}>
            <Link style={{color:'#5cab7d'}} to={'/timeline'}>
                <FaHome size={23} />
            </Link>
            <Link style={{color:'#5cab7d'}} to="/search">
                <FaSearch size={23} />
            </Link>

            <Link style={{color:'#5cab7d'}} to="/create-topic">
                    <IoMdAddCircleOutline size={50} style={{margin:'.3rem'}} />
            </Link>
            <Link style={{color:'#5cab7d'}} to="">
                <FaEnvelope size={23} />
            </Link>
            <Link style={{color:'#5cab7d'}} to="/settings">
                <FaCog size={23} />
            </Link>
        </div>
    )
}

export default Bottomnav
