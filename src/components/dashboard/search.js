import React,{ useEffect, useState, useContext } from 'react'
import styles from '../../styles/search.module.css';
import Header from './header'
import { ToastContainer, toast } from 'react-toastify';
import Bottomnav from './_bottomnav'
import Navbar from './navbar'
import { HiOutlineSearch } from 'react-icons/hi'



function Search() {

    return (
        <div className={styles.divBody}>
        <Navbar />
        <Header title="Search" />                             
        <ToastContainer />
            <div className={styles.row1}>
                <HiOutlineSearch color="grey" size={50} />
                <h3 style={{color:'grey'}}>Search is not available yet</h3>
            </div>
            <div className={styles.row2}>
            </div>
            <Bottomnav />
        </div>
    )
}

export default Search
