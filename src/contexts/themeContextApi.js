import React,{ useState, createContext, useEffect } from 'react'


export const ThemeContext = createContext();

function ThemeContextApi(props) {

    const [ darkMode, setDarkMode ] = useState({
        backgroundColor:'white',
        color:'black',
        border:'lightgrey'
    })
    const [isEnabled, setIsEnabled] = useState(false);

    const themeProviderValues = {darkMode,setDarkMode,isEnabled,setIsEnabled}

    return (
        <ThemeContext.Provider value={themeProviderValues} >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextApi
