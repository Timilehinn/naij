import React,{ useState, createContext, useEffect } from 'react'


export const ThemeContext = createContext();

function ThemeContextApi(props) {

    const [ themeMode, setThemeMode ] = useState({
        backgroundColor:'white',
        color:'black',
        border:'lightgrey'
    })
    const [isEnabled, setIsEnabled] = useState(false);

    const [toggle, setToggle] = useState(true);

    // used existing context api in existing project
    const themeProviderValues = {themeMode,setThemeMode,isEnabled,setIsEnabled,toggle,setToggle}

    return (
        <ThemeContext.Provider value={themeProviderValues} >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextApi
