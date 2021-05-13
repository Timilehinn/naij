import React,{ useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios'
import {AuthContext} from '../contexts/authContextApi'

  const ProtectedRoute = ({ component: Component, ...rest }) => {


    // const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);



    useEffect(() => {
      // send jwt to API to see if it's valid
      let token = localStorage.getItem("frse_token");
      let email = localStorage.getItem("user_email");
      if (token && email ) {
        axios.get(`https://naij-react-backend.herokuapp.com/api/isUserAuth?email=${email}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "x-access-token":token,
          },
          // body: JSON.stringify({ token })
        })
        .then((res) => {
          return res
        })
        .then((json) => {
          console.log(json)
          if (json.data.authenticated) {
            setAuth(true);
            setUserDetails(json.data.details)
            // console.log(json.data.details,' the new logs i want to see')
          }else{
            setAuth(false);
            localStorage.removeItem("frse_token");
            localStorage.removeItem("user_email");
          }
        })
        .catch((err) => {
          setAuth(false);
          localStorage.removeItem("frse_token");
        })
        .then(() => setIsTokenValidated(true));
      } else {
        setIsTokenValidated(true); // in case there is no token
      }

  }, [])

 if (!isTokenValidated) return <p>loading</p> //loader

  return (<Route {...rest}
    render={(props) => {
      return auth ? <Component {...props} /> : <Redirect to="/" />
    }} />)
  }
export default ProtectedRoute;