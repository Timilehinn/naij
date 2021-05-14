import { useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import styles from '../../styles/moremodal.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEyeSlash } from 'react-icons/fa'
import { MdReport } from 'react-icons/md'

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
    console.log(e)
    return(
        <>
        <div className={styles.main}
            style={{ display:e.state }}>
                <span onClick={()=>filterTopic(e.topic_id)}  className={styles.text1}><FaRegEyeSlash/> Hide</span>
                <span className={styles.text2}><MdReport/>Report</span>
        </div>
        <div onClick={()=>e.set('none')} style={{display:e.state,position:'fixed',zIndex:1,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0)',left:0,right:0,top:0,bottom:0}}></div>
        </>
    )
}