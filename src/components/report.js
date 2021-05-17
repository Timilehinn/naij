import React,{useContext} from 'react'
import styles from '../styles/report.module.css';
import { MdCancel } from 'react-icons/md'
import {ThemeContext} from  '../contexts/themeContextApi' 


function Report() {

    const {toggle,setToggle} = useContext(ThemeContext);

    const closeReport = () =>{
        setToggle(true);
    }

    return (
        <div className={toggle ? styles.active  : styles.report}>
            <header>
                <h3>Report post</h3>
                <MdCancel onClick={closeReport} size='30' color="#5cab7d" style={{cursor:"pointer"}} />
            </header>
            <div style={{paddingTop:"20px"}}>
                <button>hate</button>
                <button>Harassment</button>
                <button>impersonation</button>
                <button>Spam</button>
                <button>Misinformation</button>
                <button>Pornographic content</button>
                <button>Violence</button>
                <button>Sexualization</button>
                <button>Trademark violation</button>
                <button>Sharing personal information</button>
                <button>Racial abuse</button>
            </div>
        </div>
    )
}

export default Report
