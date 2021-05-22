import React,{ useEffect, useState, useContext } from 'react'
import styles from '../../styles/notifications.module.css';
import Header from './header'
import { ToastContainer, toast } from 'react-toastify';
import Bottomnav from './_bottomnav'
import Navbar from './navbar'
import { IoMdNotificationsOutline } from 'react-icons/io'
import axios from 'axios';
import {AuthContext} from '../../contexts/authContextApi'
import { FaTimes } from 'react-icons/fa'

function Search() {

    const { userDetails, setUserDetails, notifCount, setNotifCount,notifications, setNotifications } = useContext(AuthContext);

    const getNotifications =async()=>{
        const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/get-notifications?user=${userDetails.username}`)
        console.log(res)
        setNotifications(res.data.details.filter(dets=>dets.n_from !== userDetails.username))
        setNotifCount(res.data.details.length)
    }
    async function confirmRead(){
        const res = await axios.post(`https://naij-react-backend.herokuapp.com/api/read-notifications?user=${userDetails.username}`)
        console.log(res)
        if(res.data.done && res.data.success){
            setNotifCount(notifCount.length)
        }
    }
    useEffect(()=>{
        getNotifications();
        confirmRead();
        setNotifCount(0)
    },[])

   

    return (
        <div className={styles.divBody}>
        <Navbar />
        <Header title="Notifications" />                             
        <ToastContainer />
            <div className={styles.row1}>
                {notifications.length > 0? 
                <>
                    <p style={{fontSize:'.85rem',color:'grey'}}>Only unread notifications are shown</p>
                    {notifications.map(notification=>(
                    <div style={{display:'flex',alignItems:'center',color:'grey',justifyContent:'space-between', paddingLeft:'.5rem',width:'100%',height:'40px',border:'0px solid lightgrey'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <img src={notification.img} style={{height:'20px',width:'20px',borderRadius:'50%',marginRight:'.5rem'}} />
                            {notification.info}
                        </div>
                    </div>
                    ))}
                </>
                :
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'80vh',justifyContent:'center'}}>
                <IoMdNotificationsOutline color="grey" size={50} />
                <h3 style={{color:'grey',textAlign:'center'}}>You have no unread notification.</h3>
                </div>}
               
            </div>
            <div className={styles.row2}>
            </div>
            <Bottomnav />
        </div>
    )
}

export default Search
