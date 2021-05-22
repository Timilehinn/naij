import { useEffect, useState, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from '../../../styles/profile.module.css';
import {AuthContext} from '../../../contexts/authContextApi'
import axios from 'axios'
import Preview from '../../utils/preview'
import { FaPen,FaTimes, FaCheck, FaCheckCircle } from 'react-icons/fa';
import Linkify from 'react-linkify'
import { useHistory, Link, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const ProfileTabs = () => {

    const [userTopics, setUserTopics ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [modalIsOpen,setIsOpen] = useState(false);


    useEffect(()=>{
        const getUserTopics = async ()=>{
            const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/user-topics?user=${userDetails.username}`)
            console.log(res)
            if(res.data.done){
                setLoading(false)
            }
            setUserTopics(res.data.topics)
        }
        getUserTopics()
    },[])

    const deleteTopic = async (id) =>{
        if(window.confirm('Delete this topic?')){
        const res = await axios.post('https://naij-react-backend.herokuapp.com/api/delete-topic',{id:id})
          if(res.data.done){
              toast.dark(res.data.message, {
                  position: "bottom-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: false,
              });
          }
          if(res.data.success){
              const getUserTopics = async ()=>{
                  const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/user-topics?user=${userDetails.username}`)
                  console.log(res)
                  if(res.data.done){
                      setLoading(false)
                  }
                  setUserTopics(res.data.topics)
              }
              getUserTopics()
          }
        }
        
    }
   
    return (
    <Tabs>
      <TabList style={{border:'0px'}}>
        <Tab >Your Topics</Tab>
        <Tab>Messages</Tab>
        <Tab>Images</Tab>
      </TabList>
  
      <TabPanel>
            {loading ? <><Preview /><Preview /></> : 
            userTopics.map(topic=>(
            <div className={styles.topicDiv} key={topic.id} key={topic.id}>
                    <Link key={topic.id} to={{ pathname:`/topic/${topic.slug}`, topic_info:topic }} 
                            style={{color:'black',textDecoration:'none'}}>
                        <div style={{display:'flex',alignItems:'center',flexDirection:'row',marginLeft:'.5rem'}}>
                            <img src={topic.creator_img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                            <div style={{marginLeft:'.5rem'}}>
                                <p style={{fontSize:'.75rem',color:'grey'}}>Posted by @{topic.creator} {topic.is_poster_verified == 'true' ? <FaCheckCircle size={12} color='#5cab7d'/> : <></>}</p>
                            </div>
                        </div>
                        <p style={{fontWeight:'bold',marginLeft:'.5rem',marginBottom:'0rem'}}>{topic.title}</p>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'0rem',padding:'.5rem'}}>
                        {topic.img === 'data:image/png;base64,' ? <div style={{height:'0px'}}></div> 
                            : 
                            <img src={topic.img} style={{borderRadius:'.5rem'}} width="auto" height="300px" />
                        }
                            {topic.topic_body ? ( <Linkify><div style={{paddingLeft:'0rem',wordBreak:'break-all'}}>{topic.topic_body.length > 200 ? topic.topic_body.substring(0,200) + ' ...' : topic.topic_body }</div></Linkify> ) :''  }
                            <p style={{fontSize:'.8rem',color:'grey'}}>{topic.date} {topic.time}</p>
                            <p style={{fontSize:'.8rem',color:'grey',fontStyle:"italic"}}>likes: {topic.likes} replies: {topic.comment_count} </p>
                        </div>
                    </Link>
                    <button onClick={()=>deleteTopic(topic.id)} style={{backgroundColor:'transparent',padding:'.3rem',width:'50%',border:'.5px solid grey'}}>Delete</button>
              </div>
            ))}
      </TabPanel>
      <TabPanel>
        <p>Your Messages and replies will be displayed here</p>
      </TabPanel>
      <TabPanel>
        <p>Topics with images</p>
      </TabPanel>
    </Tabs>
  );
}
export default ProfileTabs;