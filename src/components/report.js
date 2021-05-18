import React,{useContext} from 'react'
import styles from '../styles/report.module.css';
import { MdCancel } from 'react-icons/md'
import {ThemeContext} from  '../contexts/themeContextApi' 

function Button(props){
    return (
        <button onClick={()=>alert(`You are reporting '${props.postinfo.title}' as ${props.category}, Proceed?`)}>{props.category}</button>
    )
}

function Report(prop) {

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
                <Button postinfo={prop} category="Hate"/>
                <Button postinfo={prop} category="Harassment"/>
                <Button postinfo={prop} category="Impersonation"/>
                <Button postinfo={prop} category="Spam"/>
                <Button postinfo={prop} category="Misinformation"/>
                <Button postinfo={prop} category="Pornographic"/>
                <Button postinfo={prop} category="Violence"/>
                <Button postinfo={prop} category="Sexualization"/>
                <Button postinfo={prop} category="Trademark Violation"/>
                <Button postinfo={prop} category="Sharing Personal Info"/>
                <Button postinfo={prop} category="Racial Abuse"/>
            </div>
        </div>
    )
}

export default Report
