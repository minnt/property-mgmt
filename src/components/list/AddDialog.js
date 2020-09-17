import React, { useState } from 'react'
import { InputGroup, Button, Dialog, Callout, HTMLSelect } from "@blueprintjs/core"
import axios from 'axios'

const AddDialog = ({ setIsDialogOpen, isDialogOpen, showToast, reload, isDarkMode }) => {

  const [inputData, setInputData] = useState({
    propertyName: "", 
    propertyNoOfUnits: 0, 
    propertyStreet: "",
    propertyCity: "", 
    propertyState: "", 
    propertyZip: "",
    propertyType: ""
  })
  
  const handleChange = (event) => {
    const {name, value} = event.target
    setInputData(prevInputData => ({...prevInputData, [name]: value}))
  }

  const handleSelectChange = (event) => {
    let value = event.currentTarget.value
    setInputData(prevInputData => ({...prevInputData, propertyType: value}))
  }

  const save = () => {
    var newProperty = {
      name:   inputData.propertyName,
      street: inputData.propertyStreet,
      city:   inputData.propertyCity,
      state:  inputData.propertyState,
      zip:    inputData.propertyZip,
      // type:   inputData.propertyType
    }

    axios.post('http://localhost:5000/residential/add', newProperty)
      .then(res => {
        setIsDialogOpen(false)
        showToast("Property added", "success")
        reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <Dialog 
      isOpen={isDialogOpen}
      className={isDarkMode ? 'bp3-dark' : ''}
      canEscapeKeyClose={true} 
      canOutsideClickClose={true}
      isCloseButtonShown={true} 
      title="Add a new property" 
      onClose={() => {setIsDialogOpen(false)}}
      icon="plus"
    >
      <div className="dialog mt20">

        <InputGroup type="text" value={inputData.propertyName} name="propertyName" placeholder="Name of property" onChange={handleChange}/>
        <hr style={{ width: '100%'}}/>

        <InputGroup type="text" value={inputData.propertyStreet} name="propertyStreet" placeholder="Street Address" onChange={handleChange}/>
        <div className="flex-sb">

          <div style={{ marginRight: '10px' }}>
            <InputGroup type="text" placeholder="City"      name="propertyCity"   value={inputData.propertyCity}  onChange={handleChange} />
          </div>

          <div style={{ marginRight: '10px' }}>
            <InputGroup type="text" placeholder="State"     name="propertyState"  value={inputData.propertyState} onChange={handleChange} />
          </div>

          <div>
            <InputGroup type="text" placeholder="ZIP Code"  name="propertyZip"    value={inputData.propertyZip}   onChange={handleChange} />
          </div>

        </div>

        <HTMLSelect onChange={handleSelectChange} disabled={false} className="width50">
          <option>Residential</option>
          <option>Commercial</option>
        </HTMLSelect>

        <Callout icon="info-sign">More detailed information can be entered on the overview page for this property, after creation.</Callout>

        <div>
          <Button icon="floppy-disk" text="Save" intent="success" onClick={() => save()} />
        </div>
      </div>
    </Dialog>
  )
}

export default AddDialog