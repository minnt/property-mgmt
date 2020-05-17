import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Context = React.createContext()

function ContextProvider({children}) {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [propertiesData, setPropertiesData] = useState([])

  // Load all properties data
  useEffect(() => {
    axios.get('http://localhost:5000/residential/')
      .then(res => {
        console.log('Loading properties data')
        setPropertiesData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }

  // Create a new property document in the database
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