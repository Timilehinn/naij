import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../../styles/viewprofile.module.css';
import axios from 'axios';
import Bottomnav from '../_bottomnav'
import Header from '../header'
import Navbar from '../navbar'
import Preview from '../../utils/preview'
import Linkify from 'react-linkify';
import { FaCheckCircle,FaEllipsisV,FaRegCommentAlt, FaTimes, FaChartLine, FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import { BiUser, BiGlobe } from 'react-icons/bi'
import { BsInfo } from 'react-icons/bs'
import { TiLocationOutline } from 'react-icons/ti'
import ViewProfileTabs from './viewprofiletabs'

function ViewProfile(props) {
    const history = useHistory();
    const username = props.match.params.username;
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ user, setUser ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userTopics, setUserTopics ] = useState([])


    useEffect(()=>{
        if(username === userDetails.username){
            history.push('/myprofile')
        }
        const findUser = async ()=>{
            const res = await axios.get(`https://naij-react-backend.herokuapp.com/api/find-user-profile?user=${username}`);
            console.log(res)
            if(res.data.found){
                setLoading(false)
            }
            setUser(res.data.details)
        }
        findUser();
<<<<<<< HEAD
=======

        
>>>>>>> local
    
    },[])

 

    return (
        <div className={styles.divBody}>
        <Navbar />
        {/* <Header title="Profile" />                              */}
            <div className={styles.row1}>
                <ViewProfileTabs username={username} />
            </div>
            <div className={styles.row2}>
            {user ? 
            <>
                <div className={styles.posterdiv} style={{display:'flex',justifyContent:'center',backgroundSize:'cover',flexDirection:'column',alignItems:'center',width:'100%',backgroundImage:`url(${user.poster_img})`}}>
                </div>
                <div style={{display:'flex',width:'95%',alignItems:'flex-start',flexDirection:'column',marginTop:'-2rem',marginLeft:'.3rem'}}>
                    <span>
                        <img src={user.img} width="75px" height="75px" style={{borderRadius:'50%',backgroundColor:'white'}} />{user.verified === 'true'? <FaCheckCircle color="#5cab7d" /> :<></>}
                    </span>
                    {/* <span style={{marginLeft:'-1rem',cursor:'pointer'}}><FaPen color="#5cab7d" size={15} /></span> */}
                    {user.fullname ? <h3>{user.fullname}</h3> :<></>}
                    <p style={{display:'flex',alignItems:'center',fontSize:'.75rem',color:'grey',margin:'2px'}}><BiUser/> @{user.username}</p>
                    {user.description ? <Linkify><p style={{fontSize:'.7rem',margin:'2px'}}>{user.description}</p></Linkify>:<></>}
                    {user.location ? <p style={{display:'flex',alignItems:'center',fontSize:'.7rem', color:'grey',margin:0}}><TiLocationOutline /> {user.location}</p> :<></>}
                    {user.url ? <Linkify><p style={{display:'flex',alignItems:'center',fontSize:'.7rem', color:'grey'}}><BiGlobe /> {user.url}</p></Linkify> :<p style={{margin:0}}></p>}
                    <p style={{display:'flex',alignItems:'center',fontSize:'.7rem',color:'grey',margin:'2px'}}>Joined {new Date(user.createdAt).getUTCMonth()}/{new Date(user.createdAt).getFullYear()}</p>
                </div>
                </>
                :
                <p>User not found</p>
            }
            </div>
            <Bottomnav />
        </div>
    )
}

export default ViewProfile
