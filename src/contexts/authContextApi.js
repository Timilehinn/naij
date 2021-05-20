import React,{ useState, createContext, useEffect } from 'react'


export const AuthContext = createContext();

function AuthContextApi(props) {

    const [ auth, setAuth ] = useState(false);
    const [ userDetails, setUserDetails ] = useState([]);
    const [ showSideBar,setShowSideBar ] = useState('100%')
    const [refTopic, setRefTopic] =useState([])
    const [ topics, setTopics ] = useState([]);
    const [ notifCount, setNotifCount] = useState('')
    const [ notifications, setNotifications ] = useState([]);
   

    


    //new contect for scroll position ***
    const [ scrollPos, setScrollPos ] = useState(0)
    const allValues = {auth, setAuth, showSideBar, setShowSideBar, userDetails, setUserDetails, 
        scrollPos, setScrollPos,topics, setTopics, refTopic, setRefTopic, notifCount, setNotifCount,
        notifications, setNotifications
    };
     
    
    return (
        <AuthContext.Provider value={allValues} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextApi
