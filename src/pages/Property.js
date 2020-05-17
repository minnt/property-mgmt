import React, {useState, useRef, useLayoutEffect, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Button, HTMLTable, InputGroup, Card, Elevation, Spinner, Icon, Tooltip, Position} from "@blueprintjs/core"
import axios from 'axios'
import {cloneDeep} from 'lodash'

import {AppToaster} from "../utils/toaster"
import LineChart from '../components/LineChart'
import image from '../img/house2.jpg'

function PropertyOverview() {

  let   {propertyId}              = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState({address: false, utilities: false, events: false, notes: false, stats: false})
  const [property,  setProperty]  = useState({})
  const [inputData, setInputData] = useState({})

  // Load property data from DB
  useEffect(() => {
    function fetchData() {
      axios.get(`http://localhost:5000/residential/${propertyId}`)
        .then(res => {
          console.log('Loading properties data')
          setProperty(res.data)

          setInputData({
            propertyName:         res.data.name, 
            propertyNoOfUnits:    0, 
            propertyStreet:       res.data.street,
            propertyCity:         res.data.city, 
            propertyState:        res.data.state, 
            propertyZip:          res.data.zip,
        
            propertyPower:        res.data.utilities.power,
            propertyGas:          res.data.utilities.gas,
            propertyWater:        res.data.utilities.water,
            propertySewage:       res.data.utilities.sewage,
            propertyWaste:        res.data.utilities.waste,
            propertyInternet:     res.data.utilities.internet,
            propertyLawncare:     res.data.utilities.lawncare,

            propertyEvents:       cloneDeep(res.data.events),
            // propertyEvents:       JSON.parse(JSON.stringify(res.data.events)),
            propertyNotes:        cloneDeep(res.data.notes),

            propertyNewEventDate: '',
            propertyNewEventInfo: ''
          })
          setTimeout(() => {setIsLoading(false)}, 2000);
          // setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [propertyId])

  // If the local property data has changed then update the DB, do not fire on first render
  const firstUpdate = useRef(true)
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    axios.post(`http://localhost:5000/residential/update/${property._id}`, property)
      .then(res => console.log(res.data))
    console.log('New property data submitted to DB')
    showToast()
  }, [property])

  function handleChange(event) {
    const {name, value} = event.target
    setInputData(prevInputData => ({...prevInputData, [name]: value}))
  }

  function handleChangeEvents(event, index, type) {
    // Get value
    const value = event.target.value

    // Create new var
    let newPropertyEvents = [...inputData.propertyEvents]

    // Update
    if (type === 'date') {
      newPropertyEvents[index].date = value
    } else if (type === 'info') {
      newPropertyEvents[index].info = value
    }

    // Merge
    setInputData(prevInputData => ({
      ...prevInputData,
      propertyEvents: [...newPropertyEvents]
    }))
  }

  function handleChangeNotes(event, index) {
    const value = event.target.value

    let newPropertyNotes = [...inputData.propertyNotes]

    newPropertyNotes[index].info = value

    setInputData(prevInputData => ({
      ...prevInputData,
      propertyNotes: [...newPropertyNotes]
    }))
  }

  const showToast = () => {
    // create toasts in response to interactions.
    // in most cases, it's enough to simply create and forget (thanks to timeout).
    AppToaster.show({message: "Changes saved", intent: "success"})
  }

  return (
    <div className="content">
      {isLoading ? 
        <div className="flex-sb ac">
          <Spinner size={Spinner.SIZE_LARGE} />
        </div>:<>
      <div className="flex-sb ac">
        <h1 className="title noselect">
          {property.name}
        </h1>
      </div>
      
      <hr />

      <div className="content-inner">
        <div className="main">

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.address)
              setIsEditing(prevState => ({...prevState, address: true}))
          }}>
            {
              isEditing.address ?
                <>
                  <InputGroup   className="mt10" value={inputData.propertyStreet} name="propertyStreet" onChange={handleChange} />
                  <div className="flex-sb">
                    <InputGroup className="mt10" value={inputData.propertyCity}   name="propertyCity"   onChange={handleChange} />
                    <InputGroup className="mt10" value={inputData.propertyState}  name="propertyState"  onChange={handleChange} />
                    <InputGroup className="mt10" value={inputData.propertyZip}    name="propertyZip"    onChange={handleChange} />
                  </div>
                  <div className="flex-sb">
                    <Button className="mt10" intent="success" icon="floppy-disk" text="Save" onClick={() => {
                      // Verify form data
                      // Set the edit var to false
                      setIsEditing(prevInputData => ({...prevInputData, address: false}))
                      // New reference
                      var newProperty = {
                        ...property,
                        street: inputData.propertyStreet,
                        city:   inputData.propertyCity,
                        state:  inputData.propertyState,
                        zip:    inputData.propertyZip
                      }
                      setProperty(newProperty)
                    }}/>
                    <Button className="mt10" intent="danger" icon="cross" text="Cancel" onClick={() => {setIsEditing(prevInputData => ({...prevInputData, address: false}))}} />
                  </div>
                </>
              :
                <>
                  <p className="address">
                    {property.street}<br />
                    {`${property.city}, ${property.state} ${property.zip}`}<br />
                  </p>
                  <Button className="mt10" icon="map" text="View on map" />
                </>
            }
          </Card>

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.utilities)
              setIsEditing(prevState => ({...prevState, utilities: true}))
          }}>
            <h1 className="heading">Utilities</h1>
            {
              isEditing.utilities ?
                <>
                  {/* <FormGroup label="Power: " inline={true} className="mt10">
                    <InputGroup id="power-input" placeholder={property.utilities.power}/>
                  </FormGroup>
                  <FormGroup label="Gas: " inline={true} className="mt10">
                    <InputGroup id="gas-input" placeholder={property.utilities.gas}/>
                  </FormGroup> */}

                  <InputGroup className="mt10" value={inputData.propertyPower}    name="propertyPower"    onChange={handleChange} />
                  <InputGroup className="mt10" value={inputData.propertyGas}      name="propertyGas"      onChange={handleChange} />
                  <InputGroup className="mt10" value={inputData.propertyWater}    name="propertyWater"    onChange={handleChange} />
                  <InputGroup className="mt10" value={inputData.propertySewage}   name="propertySewage"   onChange={handleChange} />
                  <InputGroup className="mt10" value={inputData.propertyWaste}    name="propertyWaste"    onChange={handleChange} />
                  <InputGroup className="mt10" value={inputData.propertyInternet} name="propertyInternet" onChange={handleChange} />
                  <InputGroup className="mt10" value={inputData.propertyLawncare} name="propertyLawncare" onChange={handleChange} />
                  <div className="flex-sb">
                    <Button className="mt10" intent="success" icon="floppy-disk" text="Save" onClick={() => {
                      // Verify form data
                      // Set the edit var to false
                      setIsEditing(prevInputData => ({...prevInputData, utilities: false}))
                      // New reference
                      var newUtilities = {
                        power:    inputData.propertyPower,
                        gas:      inputData.propertyGas,
                        water:    inputData.propertyWater,
                        sewage:   inputData.propertySewage,
                        waste:    inputData.propertyWaste,
                        internet: inputData.propertyInternet,
                        lawncare: inputData.propertyLawncare
                      }
                      var newProperty = {
                        ...property,
                        utilities: {...newUtilities}
                      }
                      setProperty(newProperty)
                    }}/>
                    <Button className="mt10" intent="danger" icon="cross" text="Cancel" onClick={() => {setIsEditing(prevInputData => ({...prevInputData, utilities: false}))}} />
                  </div>
                </>
              :
                <>
                  {
                    // Need a way to check for empty objects
                    property.utilities ?
                      <ul>
                        <li>Power:    <i>{property.utilities.power}</i></li>
                        <li>Gas:      <i>{property.utilities.gas}</i></li>
                        <li>Water:    <i>{property.utilities.water}</i></li>
                        <li>Sewage:   <i>{property.utilities.sewage}</i></li>
                        <li>Garbage:  <i>{property.utilities.waste}</i></li>
                        <li>Internet: <i>{property.utilities.internet}</i></li>
                        <li>Lawncare: <i>{property.utilities.lawncare}</i></li>
                      </ul>
                    :
                      <>No utilities information</>
                    }
                </>
            }
          </Card>

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.events)
              setIsEditing(prevState => ({...prevState, events: true}))
          }}>
            <h1 className="heading">Events</h1>
            {
              isEditing.events ?
                <>
                  {/* Input fields for editing events */}
                  <p className="mt20">Edit:</p>
                  {
                    inputData.propertyEvents.map((propertyEvent, index) => {
                      return (
                        <div key={propertyEvent.id} className="flex-sb ac mt10">
                          {/* Needs a real date input widget */}
                          <InputGroup className="width45" small={true} value={propertyEvent.date} onChange={(e) => {handleChangeEvents(e, index, 'date')}} />
                          <InputGroup className="width45" small={true} value={propertyEvent.info} onChange={(e) => {handleChangeEvents(e, index, 'info')}} />
                          <Tooltip content="Delete" position={Position.TOP}>
                            <Icon icon='delete' intent='danger' onClick={() => {
                              const result = inputData.propertyEvents.filter(event => event.id !== propertyEvent.id)
                              setInputData(prevInputData => ({
                                ...prevInputData,
                                propertyEvents: result
                              }))
                            }}/>
                          </Tooltip>
                        </div>
                      )
                    })
                  }

                  {/* Input fields for adding a new event */}
                  <p className="mt20">New:</p>
                  <div className="flex-sb ac mt10">
                    <InputGroup className="width45" value={inputData.propertyNewEventDate} placeholder="New event date" name="propertyNewEventDate" onChange={handleChange} />
                    <InputGroup className="width45" value={inputData.propertyNewEventInfo} placeholder="New event info" name="propertyNewEventInfo" onChange={handleChange} />
                    <Tooltip content="Add" position={Position.TOP}>
                      <Icon icon='add' intent='primary' onClick={() => {
                      let newEvent = {date: inputData.propertyNewEventDate, info: inputData.propertyNewEventInfo, id: inputData.propertyEvents.length}
                      let newPropertyEvents = [...inputData.propertyEvents]
                      newPropertyEvents.push(newEvent)
                      setInputData(prevInputData => ({
                        ...prevInputData,
                        propertyEvents: newPropertyEvents,
                        propertyNewEventDate: '',
                        propertyNewEventInfo: ''
                      }))}}/>
                    </Tooltip>
                  </div>

                  <div className="flex-sb">
                    {/* Save button */}
                    <Button className="mt10" intent="success" icon="floppy-disk" text="Save" onClick={() => {
                      setIsEditing(prevInputData => ({...prevInputData, events: false}))
                      var newProperty = {
                        ...property,
                        events: [...inputData.propertyEvents]
                      }
                      setProperty(newProperty)
                    }}/>

                    {/* Cancel button */}
                    <Button className="mt10" intent="danger" icon="cross" text="Cancel" onClick={() => {setIsEditing(prevState => ({...prevState, events: false}))}} />
                  </div>
                </>
              :
                <>
                  {
                    property.events.length > 0 ?
                      // Render events as a table
                      <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Event Info</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            property.events.map(event => {
                              return (
                                <tr key={event.id}>
                                  <td>{event.date}</td>
                                  <td>{event.info}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </HTMLTable>
                    :
                      <>No events</>
                  }
                </>
            }
          </Card>

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.notes)
              setIsEditing(prevState => ({...prevState, notes: true}))
          }}>
            <h1 className="heading">Notes</h1>
            {
              isEditing.notes ? 
                <>
                  <p className="mt20">Edit:</p>
                  {
                    inputData.propertyNotes.map((note, index) => {
                      return (
                        <div key={note.id} className="flex-sb ac mt10">
                          <InputGroup key={note.id} className="width45" small={true} value={note.info} onChange={(e) => {handleChangeNotes(e, index)}}/>
                          <Tooltip content="Delete" position={Position.TOP}>
                            <Icon icon='delete' intent='danger' onClick={console.log('click')} />
                          </Tooltip>
                        </div>
                      )
                    })
                  }
                  <p className="mt20">New:</p>
                  <div className="flex-sb ac mt10">
                    <InputGroup className="mt10 width45" placeholder="New note" />
                    <Tooltip content="Delete" position={Position.TOP}>
                      <Icon icon='add' intent='primary' onClick={console.log('click')} />
                    </Tooltip>
                  </div>
                  <div className="flex-sb">
                    {/* Save button */}
                    <Button className="mt10" intent="success" icon="floppy-disk" text="Save" onClick={() => {
                      setIsEditing(prevInputData => ({...prevInputData, notes: false}))
                      var newProperty = {
                        ...property,
                        notes: [...inputData.propertyNotes]
                      }
                      setProperty(newProperty)
                    }}/>

                    {/* Cancel button */}
                    <Button className="mt10" intent="danger" icon="cross" text="Cancel" onClick={() => {setIsEditing(prevState => ({...prevState, notes: false}))}} />
                  </div>
                </>
              :
                <>
                  {
                    property.notes.length > 0 ?
                      <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                        <tbody>
                          {
                            property.notes.map(note => {
                              return (
                                <tr key={note.id}>
                                  <td>{note.info}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </HTMLTable>
                    :
                      <>No notes</>
                  }
                </>
            }
          </Card>

          <Card interactive={true} elevation={Elevation.ZERO} onClick={() => console.log("Hello world")} className="mt20">
            <h1 className="heading">Stats</h1>
            <LineChart />
          </Card>

        </div>

        <div className="aside">
          <div className="info-pane">
            <img src={image} className="info-img" alt=""/>
            <div className="info-inner">
              <h1 className="heading">Info</h1>
              <p>
                {property.units.length} units<br />
                15,000 square feet<br />
                Rent is $500 to $1300 per month<br />
                Income: $16,800<br />
              </p>
            </div>
          </div>
        </div>

      </div>
      </>}
    </div>
  )
}

export default PropertyOverview