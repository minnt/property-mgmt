import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Context = React.createContext()

function ContextProvider({children}) {

  const [isDarkMode,      setIsDarkMode]      = useState(localStorage.getItem('isDarkMode'))
  const [propertiesData,  setPropertiesData]  = useState([])

  // Does this need to be here? Move to App.js
  useEffect(() => {
    // Check if dark mode is set in local storage
    var dm = JSON.parse(localStorage.getItem('isDarkMode'))
    if (dm !== null) {
      dm === true ? setIsDarkMode(true) : setIsDarkMode(false)
    }

    // Load property data for various components to draw from (treeNav)
    axios.get('http://localhost:5000/residential/')
      .then(res => {
        console.log('Loading properties data')
        setPropertiesData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Update local storage when the dark mode state is modified
  useEffect(() => {
    isDarkMode === true ? localStorage.setItem('isDarkMode', true) : localStorage.setItem('isDarkMode', false)
  }, [isDarkMode])

  const quickPopInVariants = {
    hidden:  { y: -5, opacity: 0 },
    visible: { y: 0,  opacity: 1 }
  }

  const displayVariants = {
    hidden:  { y: -20, opacity: 0 },
    visible: { y:0,    opacity: 1 }
  }

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 1 }
    }
  }

  // Create a new property document in the database
  // IS THIS USED? was used in ViewAll
  const addProperty = (data) => {
    axios.post('http://localhost:5000/residential/add', data)
      .then(res => console.log(res.data))
  }

  return (
    <Context.Provider value={{isDarkMode, toggleDarkMode, propertiesData, setPropertiesData, addProperty, 
      quickPopInVariants, displayVariants, containerVariants}}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}