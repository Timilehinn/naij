import React,{ useState, createContext, useEffect } from 'react'


export const AuthContext = createContext();

function AuthContextApi(props) {

    const [ auth, setAuth ] = useState(false);
    const [ userDetails, setUserDetails ] = useState([]);
    const [ showSideBar,setShowSideBar ] = useState('100%')
    const [refTopic, setRefTopic] =useState([])

   

    


    //new contect for scroll position ***
    const [ scrollPos, setScrollPos ] = useState(0)
    const allValues = {auth, setAuth, showSideBar, setShowSideBar, userDetails, setUserDetails, scrollPos, setScrollPos, refTopic, setRefTopic};
     
    
    return (
        <AuthContext.Provider value={allValues} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextApi
