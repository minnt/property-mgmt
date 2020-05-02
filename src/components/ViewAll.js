import React, {useState, useContext} from 'react'

import {HTMLTable, InputGroup, Button, Navbar, Alignment, Tag, Tab, Tabs, 
  NumericInput, FileInput, Dialog} from "@blueprintjs/core"

import {Context} from '../Context'

// Component to render a table
function ViewAll() {

  const {addProperty} = useContext(Context)

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
        <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
          <thead>
            <tr>
              <th>Name</th>
              <th># of Units</th>
              <th>Type</th>
              <th>Net Income</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jongleur Towers</td>
              <td>100</td>
              <td><Tag>Commerial</Tag></td>
              <td>$140,000</td>
            </tr>
            <tr>
              <td>Scranton Park</td>
              <td>10</td>
              <td><Tag>Commerial</Tag></td>
              <td>$5,000</td>
            </tr>
            <tr>
              <td>Park Place</td>
              <td>5</td>
              <td><Tag>Commerial</Tag></td>
              <td>$50,000</td>
            </tr>
            <tr>
              <td>Shady Oaks</td>
              <td>24</td>
              <td><Tag intent="primary">Residential</Tag></td>
              <td>$50,000</td>
            </tr>
            <tr>
              <td>Boardwalk</td>
              <td>12</td>
              <td><Tag intent="primary">Residential</Tag></td>
              <td>$30,000</td>
            </tr>
            <tr>
              <td>Bowerstone Apartments</td>
              <td>14</td>
              <td><Tag intent="primary">Residential</Tag></td>
              <td>$10,000</td>
            </tr>
          </tbody>
        </HTMLTable>
      </div>

    </div>
  )
}

export default ViewAll