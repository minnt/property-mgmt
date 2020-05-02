import React, {useState} from 'react'

import pData from './data/propertiesData'
// import zData from './data/propertiesDataZ'

const Context = React.createContext()


function ContextProvider({children}) {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [propertiesData, setPropertiesData] = useState(pData)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPropertiesData(zData)
  //   }, 3000)
  // }, [])

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }

  const addProperty = (data) => {
    // Info passed in: name, noOfUnits, address(street, city, state, zip), images
    const newData = {
      id: propertiesData.residential.length,
      name: data.propertyName,
      addrLineOne: data.propertyStreet,
      addrLineTwo: `${data.propertyCity}, ${data.propertyState} ${data.propertyZip}`,
      unitsAmount: data.propertyNoOfUnits,
      units: []
    }

    var newState = {commercial: [], residential: []}
    // var newState = {}
    // newState = propertiesData
    newState.residential = propertiesData.residential
    newState.residential.push(newData)

    setPropertiesData(newState)
  }


  return (
    <Context.Provider value={{isDarkMode, toggleDarkMode, propertiesData, setPropertiesData, addProperty}}>
      {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}