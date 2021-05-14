import React, { useState, useContext, useEffect } from 'react'
import styles from '../../styles/preloader.module.css'

export default function Preloader(){
    return(
        <div className = {styles.the_box}>
            <div className={styles.loader}></div>
        </div>
    )
   
}