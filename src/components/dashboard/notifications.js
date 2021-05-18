import React,{ useEffect, useState, useContext } from 'react'
import styles from '../../styles/notifications.module.css';
import Header from './header'
import { ToastContainer, toast } from 'react-toastify';
import Bottomnav from './_bottomnav'
import Navbar from './navbar'
import { IoMdNotificationsOutline } from 'react-icons/io'


function Search() {

    return (
        <div className={styles.divBody}>
        <Navbar />
        <Header title="Notifications" />                             
        <ToastContainer />
            <div className={styles.row1}>
                <IoMdNotificationsOutline color="grey" size={50} />
                <h3 style={{color:'grey'}}>You have no notifications yet</h3>
            </div>
            <div className={styles.row2}>
            </div>
            <Bottomnav />
        </div>
    )
}

export default Search
