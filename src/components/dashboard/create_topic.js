import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import ReactDOM from 'react-dom';
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
import Resizer from "react-image-file-resizer";
import Navbar from './navbar'
import {Helmet} from "react-helmet";
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import '../../App.css';


function MyEditor() {
  

  return(
    <>
    </>
  )
}

function Create_topic() {

    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ topics, setTopics ] = useState([]);
    const [ title,setTitle ] = useState('');
    // const [ post, setPost ] = useState('');
    const [ photo, setPhoto ] = useState('');
    const [ photoName, setPhotoName ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const [ preview_img_display, setPreview_img_display ] = useState('none')
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const [editorState, setEditorState] = React.useState(
      () => EditorState.createEmpty(),
    );
    const editor = React.useRef(null);
 
    // function focusEditor() {
    //   editor.current.focus();
    // }
   
    // React.useEffect(() => {
    //   focusEditor()
    // }, []);
  
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    
    const post = draftToHtml(
      rawContentState, 
      // hashtagConfig, 
      // directional, 
      // customEntityTransform
    );
    console.log(post)

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


    // const resizeFile = (file) =>
    // new Promise((resolve) => {
    //   Resizer.imageFileResizer(
    //     file,
    //     300,
    //     300,
    //     "JPEG",
    //     100,
    //     0,
    //     (uri) => {
    //       resolve(uri);
    //     },
    //     "base64"
    //   );
    // });


    // async function handleFiles(e){
    //     // var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
    //     // setPhotoName(e.fileList[0].name)
    //     // setPhoto(e.base64)
    //     // setPhotoBase64(pre_removed)
    //     // setPreview_img_display('flex')
    //     // console.log(e.fileList[0])
    //     try {
    //         const file = e.fileList[0];
    //         console.log(file)
    //         const image = await resizeFile(file);
    //         console.log(image, 'this ?');
    //       } catch (err) {
    //         console.log(err);
    //       }
    // }

    function handleFiles(event) {
        console.log('started')
        var fileInput = false;
        if (event.target.files[0]) {
          fileInput = true;
        }
        if (fileInput) {
          try {
            Resizer.imageFileResizer(
              event.target.files[0],
              500,
              500,
              "JPEG",
              100,
              0,
              (uri) => {
                console.log(uri);
                var pre_removed = uri.substring(uri.indexOf(",") + 1)
                setPhotoName(event.target.files[0].name)
                setPhoto(uri);
                setPhotoBase64(pre_removed)
              },
              "base64",
              200,
              200
            );
          } catch (err) {
            console.log(err);
          }
        }
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
            const res = await axios.post('http://localhost:3333/create-topic',{
                title,post,photoBase64,creator:userDetails[0].fullname,creator_img:userDetails[0].img,verified:userDetails[0].verified,
                creator_email:userDetails[0].email
            })
            console.log(res.data)
            // setIsUploaded(res.data);
                if(res.data.success){
                    toast.info(res.data.msg);
                    setPhoto(null)
                    setTitle('')
                    // setPost('')
                    closeModal();
                }else{
                    toast.error(res.data.msg);
                }
            }
            
    }
 
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Create a topic.</title>
        </Helmet>
        <Navbar />
        <Header title="Recent topics" />
        <div className={styles.divBody}>
            <div className={styles.row1}>
              <ToastContainer />
              <div>
                <input placeholder="Search Rooms (...in production)" style={{width:'100%',border:'.5px solid lightgrey',height:'30px',marginBottom:'1rem'}} />
                <input
                    style={{width:'100%',border:'.5px solid lightgrey',height:'30px',marginBottom:'1rem'}}
                    onChange={e=>setTitle(e.target.value)} maxLength="190" placeholder="Title" required />

                    <Editor defaultEditorState={editorState} onEditorStateChange={setEditorState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                  />
                  <label style={{cursor:'pointer'}} for="img-up" >Choose Image
                  <input style={{visibility:'hidden'}} type="file" id="img-up" onChange={e=>handleFiles(e)} accept="image/x-png,image/gif,image/jpeg" />
                  </label>
                      <span style={{color:'grey',fontStyle:'italic'}}>{photoName}</span>
                  {/* </ReactFileReader> */}
                  {/* <textarea onChange={e=>setPost(e.target.value)} maxLength="350" style={{marginTop:".5rem",height:'150px',width:'100%'}}  placeholder="Post (Optional)" /> */}
              </div>
              <button style={{padding:'.75rem',zIndex:1, color:'white', fontWeight:'bold', backgroundColor:'#5cab7d', width:'100%',marginTop:'1rem',border:'0px solid grey',cursor:'pointer'}} onClick={()=>publishPost()}>Publish</button>
            </div>
      
            <div className={styles.row2}>
                    {/* <input style={{width:'80%', height:'30px',borderRadius:'5rem',border:'.5px solid green'}} /> */}
                <div> 
                    <h3>Your communities</h3>
                    <p> lore ipsum dor itemt</p>
                    <p> lore ipsum dor itemt</p>
                    <p> lore ipsum dor itemt</p>
                </div>
                <div>
                    <h3>Topic giudelines</h3>
                    <p>Post real content</p>
                    <p>You are solely repsonible for every post</p>
                    <p>Lorem ipsum</p>
                </div>
            </div>
            {/* <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <button style={{marginBottom:'.3rem'}} onClick={closeModal}>X close</button>
                
            </Modal>  */}
        </div>
        </>

    )
}

export default Create_topic
