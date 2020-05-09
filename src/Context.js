import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Context = React.createContext()

function ContextProvider({children}) {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [propertiesData, setPropertiesData] = useState([])

  // Load properties data
  useEffect(() => {
    axios.get('http://localhost:5000/residential/')
    .then(res => {
      console.log('Updating properties data')
      setPropertiesData(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }

  // Create a new property document in the database
  function addProperty(data) {
    // Info passed in: name, noOfUnits, address(street, city, state, zip), images
    // const newData = {
    //   name: data.propertyName,
    //   street: data.propertyStreet,
    //   city: data.city,
    //   state: data.state,
    //   zip: data.zip,

    //   addrLineTwo: `${data.propertyCity}, ${data.propertyState} ${data.propertyZip}`,
    //   units: []
    // }

    // Create new object so that it doesn't reference the same memory as propertiesData, thus being equal
    // var newState = {commercial: [], residential: []}
    // newState.residential = propertiesData
    // newState.residential.push(newData)

    //setPropertiesData(newState)

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