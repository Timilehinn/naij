import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/create-topic.module.css';
import axios from 'axios';
import User_home from './user_home'
import { FaPen, FaCheckCircle, FaTimes, FaPlus } from 'react-icons/fa';
import TextareaAutosize from 'react-autosize-textarea';
import Header from './header'
import { ToastContainer, toast } from 'react-toastify';
import ReactFileReader from 'react-file-reader';
import { IoMdChatboxes,IoMdHeart,IoIosImage, IoMdArrowDown,IoMdArrowUp, IoIosChatbubbles } from 'react-icons/io'
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive'




function Create_topic() {

    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ topics, setTopics ] = useState([]);
    const [ title,setTitle ] = useState('');
    const [ post, setPost ] = useState('');
    const [ photo, setPhoto ] = useState('');
    const [ photoName, setPhotoName ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const [ preview_img_display, setPreview_img_display ] = useState('none')
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

    function createWidth(){
        if(isMobile){
            return '80%'
        }else{
            return '50%'
        }
    }
    const customStyles = {
        content : {
          width:createWidth(),
          height:'50%',
          top:'50%',
          left:'50%',
          right:'auto',
          bottom:'auto',
          marginRight:'-50%',
          transform:'translate(-50%, -50%)',
          overflowX:'hidden'
        }
      };
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    
    console.log(createWidth())
    function handleFiles(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhotoName(e.fileList[0].name)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setPreview_img_display('flex')
    }


    // modal
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    }
  
    function closeModal(){
      setIsOpen(false);
    }


    const publishPost= async ()=>{
        if(title || post ){
            // console.log(title)
            // console.log(post)
            // console.log(photoBase64)
            const res = await axios.post('https://naij-react-backend.herokuapp.com/create-topic',{
                title,post,photoBase64,creator:userDetails[0].fullname,creator_img:userDetails[0].img,verified:userDetails[0].verified,
                creator_email:userDetails[0].email
            })
            console.log(res.data)
            // setIsUploaded(res.data);
                if(res.data.success){
                    toast.info(res.data.msg);
                    setPhoto(null)
                    setTitle('')
                    setPost('')
                    closeModal();
                }else{
                    toast.error(res.data.msg);
                }
            }
            
    }
 
    return (
        <>
            <div className={styles.createTopicDiv}>
            <ToastContainer />
                <img src={userDetails[0].img} style={{width:'40px',height:'35px',marginRight:'.25rem',borderRadius:'50%'}} />
                <TextareaAutosize  onClick={()=>openModal()} maxLength="350" className={styles.input}  placeholder="Post" required />
                <IoIosImage onClick={()=>openModal()} size={35} />
                <button onClick={()=>openModal()} className={styles.button} >
                    <FaPlus/>
                </button>
            
            </div>
      

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <button style={{marginBottom:'.3rem'}} onClick={closeModal}>X close</button>
                <input
                style={{width:'100%',height:'30px',marginBottom:'1rem'}}
                placehoder="title" onChange={e=>setTitle(e.target.value)} maxLength="300" placehoder="Title" required />
                <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                    <span style={{cursor:'pointer'}}>Select Image</span> <span style={{color:'grey',fontStyle:'italic'}}>{photoName}</span>
                </ReactFileReader>
                <textarea onChange={e=>setPost(e.target.value)} maxLength="350" style={{marginTop:".5rem",height:'150px',width:'100%'}}  placeholder="Post (Optional)" />
                <button style={{padding:'.5rem',border:'.5px solid grey',backgroundColor:'transparent',cursor:'pointer'}} onClick={()=>publishPost()}>Publish</button>
            </Modal>
        </>

    )
}

export default Create_topic
