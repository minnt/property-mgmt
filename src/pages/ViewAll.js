import React, {useState, useContext} from 'react'

import {HTMLTable, InputGroup, Button, Navbar, Alignment, Tag, Tab, Tabs, 
  NumericInput, FileInput, Dialog} from "@blueprintjs/core"

import {Context} from '../Context'

// Component to render a table
function ViewAll() {

  const {propertiesData, addProperty} = useContext(Context)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [inputData, setInputData] = useState({
    propertyName: "", 
    propertyNoOfUnits: 0, 
    propertyStreet: "",
    propertyCity: "", 
    propertyState: "", 
    propertyZip: 0
  })

  function handleChange(event) {
    const {name, value} = event.target
    setInputData(prevInputData => ({...prevInputData, [name]: value}))
  }

  return (
    <div className="content">

      <h1 className="title noselect">
        All Properties
      </h1>
      <hr />

      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Button className="bp3-minimal" icon="plus" text="Add" onClick={() => setIsDialogOpen(true)}/>
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <InputGroup type="search" placeholder="Search all properties..."/>
          <Navbar.Divider />
          <Navbar.Heading>Filter:</Navbar.Heading>
          {/* Doesn't act as shown on docs, line should be on navbar */}
          <Tabs animate={true} id="navbar" large={true}>
            <Tab id="all" title="All" />
            <Tab id="com" title="Commercial" />
            <Tab id="res" title="Residential" />
          </Tabs>
        </Navbar.Group>
      </Navbar>

      <Dialog isOpen={isDialogOpen} canEscapeKeyClose={true} canOutsideClickClose={true}
        isCloseButtonShown={true} title="Add a new property" onClose={() => {setIsDialogOpen(false)}}
        icon="plus">
        <div className="dialog mt20">
          <InputGroup type="text" value={inputData.propertyName} name="propertyName" placeholder="Name of property" onChange={handleChange}/>
          <div className="flex-sb">
            Number of units: <NumericInput name="propertyNoOfUnits"/>
          </div>
          <InputGroup type="text" name="propertyStreet" placeholder="Street Address"/>
          <div className="flex-sb">
            <InputGroup type="text" className="f-4 padr-5"  placeholder="City"      name="propertyCity"/>
            <InputGroup type="text" className="f-2 padr-5"  placeholder="State"     name="propertyState"/>
            <InputGroup type="text" className="f-2"         placeholder="ZIP Code"  name="propertyZip"/>
          </div>
          <FileInput disabled={false} text="Upload images..." />
          <div className="width50">
            <Button icon="floppy-disk" text="Save" onClick={() => {addProperty(inputData)}}/>
          </div>
        </div>
      </Dialog>

      <div className="flex-sb mt20">
        {
          propertiesData.length > 0 ?
            <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th># of Units</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {
                  // EVENT AS ID, FIX
                  propertiesData.map(property => {
                    return (
                      <tr key={property.name}>
                        <td>{property.name}</td>
                        <td><Tag intent={property.type === "Residential" ? 'primary' : ''}>{property.type}</Tag></td>
                        <td>{property.units.length}</td>
                        <td>{property.city}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </HTMLTable>
          :
            <>No properties</>
        }
      </div>

    </div>
  )
}

export default ViewAll