import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Context = React.createContext()

function ContextProvider({children}) {

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode'))
  const [propertiesData, setPropertiesData] = useState([])

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

  // Update local storage when the dark mode state is modified
  useEffect(() => {
    isDarkMode === true ? localStorage.setItem('isDarkMode', true) : localStorage.setItem('isDarkMode', false)
  }, [isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }

  // Create a new property document in the database
  // IS THIS USED? was used in ViewAll
  function addProperty(data) {
    axios.post('http://localhost:5000/residential/add', data)
      .then(res => console.log(res.data))
  }

  return (
    <Context.Provider value={{isDarkMode, toggleDarkMode, propertiesData, setPropertiesData, addProperty}}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}