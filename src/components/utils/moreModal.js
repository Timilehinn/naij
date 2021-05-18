import { useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import styles from '../../styles/moremodal.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEyeSlash, FaFlag } from 'react-icons/fa'
import { MdReport } from 'react-icons/md'
import {ThemeContext} from '../../contexts/themeContextApi'

//styles for report modal
import styles2 from '../../styles/report.module.css';
import { MdCancel } from 'react-icons/md'
// import {ThemeContext} from  '../contexts/themeContextApi' 

function Button(props){
    return (
        <button onClick={()=>alert(`You are reporting '${props.postinfo.topic.title}' under ${props.category} `)}>{props.category}</button>
    )
}

function Report(prop) {

    const {toggle,setToggle} = useContext(ThemeContext);

    const closeReport = () =>{
        setToggle(true);
    }

    return (
        <div className={toggle ? styles2.active  : styles2.report}>
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

// export default Report





export default function MoreModal(e){
    const { topics, setTopics } = useContext(AuthContext);
    function filterTopic(id){
        var newtopics = topics.filter(topic=>topic.id !== id)
        setTopics(newtopics)
        toast.dark('Post hidden succesfully', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: false,
        });
    }

    // toggle api 
    const {toggle,setToggle} = useContext(ThemeContext);
    const openToggle = () =>{
        setToggle(false);
    }

    const conditionslStyel = {
        display:"none",
    }

    const conditionslStyleOpen ={
        display:"block"
    }

    return(
        <>
        <div className={styles.main}
            style={{ display:e.state }}>
                <span onClick={()=>filterTopic(e.topic_id)}  className={styles.text1}><FaRegEyeSlash/> Hide</span>
                <span onClick={openToggle}  className={styles.text2}><FaFlag/>Report</span>
            <Report topic={e.topic}/>
        </div>
        <div onClick={()=>e.set('none')} style={{display:e.state,position:'fixed',zIndex:1,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0)',left:0,right:0,top:0,bottom:0}}></div>
        </>
    )
}