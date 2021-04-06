import React,{ useState, createContext } from 'react'
import io from "socket.io-client";

export const SocketContext = createContext();

function SocketContextApi(props) {

    const socket = io("https://naij-react-backend.herokuapp.com", { transport : ['websocket'] });
    const socketVal = {socket}

    return (
        <SocketContext.Provider value={socketVal} >
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketContextApi
