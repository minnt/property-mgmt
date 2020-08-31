import React, { useState, useRef, useLayoutEffect, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Button, HTMLTable, InputGroup, Card, Elevation, Spinner, Icon, Tooltip, Position, Drawer, Popover, Intent, EditableText } from '@blueprintjs/core'
import { DatePicker, Classes } from '@blueprintjs/datetime'
import axios from 'axios'
import { cloneDeep } from 'lodash'
// import { motion, AnimatePresence } from 'framer-motion'

import { Context } from '../Context'
import { AppToaster } from '../utils/toaster'
import { months, days } from '../utils/monthsDays'

// Components
import BlockControls from '../components/BlockControls'
import LineChart from '../components/LineChart'

// Images
import image from '../img/default_house.jpg'

function Property() {

  let   {propertyId}                     = useParams()
  const {isDarkMode}                     = useContext(Context)
  const [isLoading,     setIsLoading]    = useState(true)
  const [isEditing,     setIsEditing]    = useState({address: false, utilities: false, events: false, notes: false, stats: false})
  const [isDrawerOpen,  setIsDrawerOpen] = useState(false)
  const [property,      setProperty]     = useState({})
  const [photos,        setPhotos]       = useState([])
  const [coverPhoto,    setCoverPhoto]   = useState('')
  const [inputData,     setInputData]    = useState({})
  const [lastUpdate,    setLastUpdate]   = useState('')
  const [isFavorite,    setIsFavorite]   = useState(false)
  const [selectedDate,  setSelectedDate] = useState('Select Date')
  const [editText,      setEditText]     = useState('15,000')

  // Load property data from DB
  useEffect(() => {
    function fetchData() {
      axios.get(`http://localhost:5000/residential/${propertyId}`)
        .then(res => {
          console.log('Loading properties data')
          setProperty(res.data)

          var myDate = new Date(res.data.updatedOn)
          var month = myDate.getMonth()
          var date = myDate.getDate()
          var day = myDate.getDay()
          var hours = myDate.getHours()
          var minutes = myDate.getMinutes()
          var year = myDate.getFullYear()

          setLastUpdate(`${hours}:${minutes} ${days[day]} ${months[month]} ${date} ${year}`)

          if (res.data.coverPhoto !== '') {
            setCoverPhoto(res.data.coverPhoto)
          } else {
            setCoverPhoto(image)
          }

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
          setIsLoading(false)
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
    axios.post(`http://localhost:5000/residential/update/${property._id}`, property) // Does this need fixed?
      .then(res => console.log(res.data))
    // console.log('New property data submitted to DB')
    showToast('Changes saved', 'success')
  }, [property])

  const parseDate = (inputDate) => {
    var myDate = new Date(inputDate)
    var month = myDate.getMonth()
    var date = myDate.getDate()
    var day = myDate.getDay()
    var hours = myDate.getHours()
    var minutes = addZero(myDate.getMinutes())
    var year = myDate.getFullYear()

    setLastUpdate(`${hours}:${minutes} ${days[day]} ${months[month]} ${date} ${year}`)
  }

  const addZero = (i) => {
    if (i < 10)
      i = "0" + i
    return i
  }

  const showToast = (msg, int) => {
    AppToaster.show({message: msg, intent: int})
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setInputData(prevInputData => ({...prevInputData, [name]: value}))
  }

  const handleChangeEvents = (event, index, type) => {
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

  const handleTextChange = (event) => {
    setEditText(event)
  }

  const handleChangeNotes = (event, index) => {
    const value = event.target.value
    let newPropertyNotes = [...inputData.propertyNotes]
    newPropertyNotes[index].info = value
    setInputData(prevInputData => ({
      ...prevInputData,
      propertyNotes: [...newPropertyNotes]
    }))
  }

  const handleDateChange = (event) => {
    if (event !== null) {
      var date  = event.getDate()
      var month = event.getMonth()
      var year  = event.getFullYear()
      setSelectedDate(`${months[month]} ${date} ${year}`)
    } else {
      console.log("Null date")
    }
  }

  return (
    <div className="content">

      {isLoading ? 
        <div className="spinner">
          <Spinner size={Spinner.SIZE_LARGE} />
        </div>:<>

      <div className="flex-sb ac">
        <h1 className="title noselect">
          {property.name}
        </h1>
        <h5><i>Last edited: {lastUpdate}</i></h5>
        <div style={{ padding: '15px 0', width: '150px' }}>
          <Button minimal={true} onClick={() => {setIsFavorite(prevState => !prevState)}}>
            {
              isFavorite ?
                <>
                  <i className="fas fa-star" style={{ marginRight: '5px' }}></i>
                  Favorited
                </>
              :
                <>
                  <i className="far fa-star" style={{ marginRight: '5px' }}></i>
                  Mark 'Favorite'
                </>
            }
          </Button>
        </div>
      </div>
      
      <hr />

      <div className="content-inner">
        <div className="main">

          {/* ===PHOTOS DRAWER=== */}
          <Drawer
            className={isDarkMode ? 'bp3-dark' : ''}
            isOpen={isDrawerOpen}
            canEscapeKeyClose={true}
            canOutsideClickClose={true}
            position={Position.BOTTOM}
            size={Drawer.SIZE_STANDARD}
            title="Choose a new cover photo"
            onClose={() => {setIsDrawerOpen(false)}}
          >
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', padding: '50px', columnGap: '2em'}}>
              {
                photos.length > 0 ?
                  <>
                    {
                      photos.map(photo => {
                        return (
                          <div key={photo._id} className="mt50" style={{width: '100%'}}>
                            <img className="pic pointer" src={`http://localhost:5000/photos/image/${photo.filename}`} alt="" onClick={() => {
                              setCoverPhoto(`http://localhost:5000/photos/image/${photo.filename}`)
                              var newProperty = {
                                ...property,
                                coverPhoto: `http://localhost:5000/photos/image/${photo.filename}`
                                // updatedOn: timestamp
                              }
                              setProperty(newProperty)
                              setIsDrawerOpen(false)
                            }}/>
                          </div>
                        )
                      })
                    }
                  </>
                :
                  <>
                    No photos to show
                  </>
              }
            </div>
          </Drawer>

          {/* ===ADDRESS=== */}
          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.address)
              setIsEditing(prevState => ({...prevState, address: true}))
          }}>
            <div className="flex-sb">
              <h1 className="heading">Location</h1>
              <BlockControls add={false} edit={true} />
            </div>
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
                      var myDate = new Date()
                      var timestamp = myDate.getTime()
                      var newProperty = {
                        ...property,
                        street:     inputData.propertyStreet,
                        city:       inputData.propertyCity,
                        state:      inputData.propertyState,
                        zip:        inputData.propertyZip,
                        updatedOn:  timestamp
                      }
                      parseDate(timestamp)
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

          {/* ===UTILITIES=== */}
          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.utilities)
              setIsEditing(prevState => ({...prevState, utilities: true}))
          }}>
            <div className="flex-sb">
              <h1 className="heading">Utilities</h1>
              <BlockControls add={false} edit={true} />
            </div>
            {
              isEditing.utilities ?
                <>
                  {/* <FormGroup label="Power: " inline={true} className="mt10">
                    <InputGroup id="power-input" placeholder={property.utilities.power}/>
                  </FormGroup>
                  <FormGroup label="Gas: " inline={true} className="mt10">
                    <InputGroup id="gas-input" placeholder={property.utilities.gas}/>
                  </FormGroup> */}
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '30px' }}>
                      <i className="fas fa-plug" style={{ color: 'rgb(247, 194, 47)', paddingRight: '10px'}}></i>
                    </div>
                    <InputGroup value={inputData.propertyPower} fill={true} name="propertyPower" onChange={handleChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '30px' }}>
                      <i className="fas fa-fire" style={{ color: 'rgb(247, 127, 47)', paddingRight: '10px'}}></i>
                    </div>
                    <InputGroup value={inputData.propertyGas} fill={true} name="propertyGas" onChange={handleChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '30px' }}>
                      <i className="fas fa-faucet" style={{ color: 'rgb(47, 167, 247)', paddingRight: '10px'}}></i>
                    </div>
                    <InputGroup value={inputData.propertyWater} fill={true} name="propertyWater" onChange={handleChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '30px' }}>
                      <i className="fas fa-toilet" style={{ color: '#BFCCD6', paddingRight: '10px'}}></i>
                    </div>
                    <InputGroup value={inputData.propertySewage} fill={true} name="propertySewage" onChange={handleChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '30px' }}>
                      <i className="fas fa-trash-alt" style={{ color: '#8A9BA8', paddingRight: '10px'}}></i>
                    </div>
                    <InputGroup value={inputData.propertyWaste} fill={true} name="propertyWaste" onChange={handleChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '30px' }}>
                      <i className="fas fa-wifi" style={{ color: '#00B3A4', paddingRight: '10px'}}></i>
                    </div>
                    <InputGroup value={inputData.propertyInternet} fill={true} name="propertyInternet" onChange={handleChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '30px' }}>
                      <i className="fas fa-leaf" style={{ color: 'rgb(117, 247, 47)', paddingRight: '10px'}}></i>
                    </div>
                    <InputGroup value={inputData.propertyLawncare} fill={true} name="propertyLawncare" onChange={handleChange} />
                  </div>
                  <div className="flex-sb" style={{ marginTop: '20px' }}>
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

                      var myDate = new Date()
                      var timestamp = myDate.getTime()

                      var newProperty = {
                        ...property,
                        utilities: {...newUtilities},
                        updatedOn: timestamp
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
                      <HTMLTable className="width100" bordered={false} striped={false} condensed={true}>
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th></th>
                            <th>Provider</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Power</td>
                            <td><i className="fas fa-plug"      style={{ color: 'rgb(247, 194, 47)' }}></i></td>
                            <td><i>{property.utilities.power}</i></td>
                          </tr>
                          <tr>
                            <td>Gas</td>
                            <td><i className="fas fa-fire"      style={{ color: 'rgb(247, 127, 47)' }}></i></td>
                            <td><i>{property.utilities.gas}</i></td>
                          </tr>
                          <tr>
                            <td>Water</td>
                            <td><i className="fas fa-faucet"    style={{ color: 'rgb(47, 167, 247)' }}></i></td>
                            <td><i>{property.utilities.water}</i></td>
                          </tr>
                          <tr>
                            <td>Sewage</td>
                            <td><i className="fas fa-toilet"    style={{ color: '#BFCCD6' }}></i></td>
                            <td><i>{property.utilities.sewage}</i></td>
                          </tr>
                          <tr>
                            <td>Waste</td>
                            <td><i className="fas fa-trash-alt" style={{ color: '#8A9BA8' }}></i></td>
                            <td><i>{property.utilities.waste}</i></td>
                          </tr>
                          <tr>
                            <td>Internet</td>
                            <td><i className="fas fa-wifi"      style={{ color: '#00B3A4' }}></i></td>
                            <td><i>{property.utilities.internet}</i></td>
                          </tr>
                          <tr>
                            <td>Lawncare</td>
                            <td><i className="fas fa-leaf"      style={{ color: 'rgb(117, 247, 47)' }}></i></td>
                            <td><i>{property.utilities.lawncare}</i></td>
                          </tr>
                        </tbody>
                      </HTMLTable>
                    :
                      <>No utilities information</>
                    }
                </>
            }
          </Card>

          {/* ===EVENTS=== */}
          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.events)
              setIsEditing(prevState => ({...prevState, events: true}))
          }}>
            <div className="flex-sb">
              <h1 className="heading">Events</h1>
              <BlockControls add={true} edit={true} />
            </div>
            {
              isEditing.events ?
                <>
                  {/* Input fields for editing events */}
                  <p>Edit:</p>
                  {
                    inputData.propertyEvents.map((propertyEvent, index) => {
                      return (
                        <div key={propertyEvent.id} className="flex-sb ac mt10">
                          <InputGroup small={true} fill={true} value={propertyEvent.date} onChange={(e) => {handleChangeEvents(e, index, 'date')}} />
                          <div style={{ width: '10px' }}></div>
                          <InputGroup small={true} fill={true} value={propertyEvent.info} onChange={(e) => {handleChangeEvents(e, index, 'info')}} />
                          <div style={{ marginLeft: '15px' }}>
                            <Tooltip content="Delete" position={Position.TOP}>
                              <Button icon='delete' intent='danger' minimal={true} onClick={() => {
                                const result = inputData.propertyEvents.filter(event => event.id !== propertyEvent.id)
                                setInputData(prevInputData => ({
                                  ...prevInputData,
                                  propertyEvents: result
                                }))
                              }}/>
                            </Tooltip>
                          </div>
                        </div>
                      )
                    })
                  }

                  {/* Input fields for adding a new event */}
                  <p className="mt20">New:</p>
                  <div className="flex-sb mt10">
                    {/* <InputGroup className="width45" value={inputData.propertyNewEventDate} placeholder="New event date" name="propertyNewEventDate" onChange={handleChange}/> */}
                    <div style={{ marginRight: '5px', width: '240px'}}>
                      <Popover autoFocus={false}>
                        <Button intent={Intent.PRIMARY} text={selectedDate} icon="timeline-events" />
                        <DatePicker className={Classes.ELEVATION_1} highlightCurrentDay={true} onChange={handleDateChange} />
                      </Popover>
                    </div>

                    <InputGroup 
                      style={{ flex: 'auto'}} 
                      fill={true}
                      value={inputData.propertyNewEventInfo} 
                      placeholder="New event info" 
                      name="propertyNewEventInfo" 
                      onChange={handleChange}
                    />

                    <div style={{ marginLeft: '15px' }}>
                      <Tooltip content="Add" position={Position.TOP}>
                        <Button icon='add' intent='primary' minimal={true} onClick={() => {
                          let newEvent = {date: selectedDate, info: inputData.propertyNewEventInfo, id: inputData.propertyEvents.length}
                          let newPropertyEvents = [...inputData.propertyEvents]
                          newPropertyEvents.push(newEvent)
                          setInputData(prevInputData => ({
                            ...prevInputData,
                            propertyEvents: newPropertyEvents,
                            propertyNewEventDate: '',
                            propertyNewEventInfo: ''
                          }))
                        }}/>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="flex-sb" style={{ marginTop: '20px' }}>
                    {/* Save button */}
                    <Button className="mt10" intent="success" icon="floppy-disk" text="Save" onClick={() => {
                      setIsEditing(prevInputData => ({...prevInputData, events: false}))
                      var myDate = new Date()
                      var timestamp = myDate.getTime()
                      var newProperty = {
                        ...property,
                        events: [...inputData.propertyEvents],
                        updatedOn: timestamp
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

          {/* ===NOTES=== */}
          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.notes)
              setIsEditing(prevState => ({...prevState, notes: true}))
          }}>
            <div className="flex-sb">
              <h1 className="heading">Notes</h1>
              <BlockControls add={true} edit={true} />
            </div>
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
                      var myDate = new Date()
                      var timestamp = myDate.getTime()
                      var newProperty = {
                        ...property,
                        notes: [...inputData.propertyNotes],
                        updatedOn: timestamp
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

          {/* ===STATS=== */}
          <Card interactive={false} elevation={Elevation.ZERO} className="mt20">
            <h1 className="heading">Stats</h1>
            <LineChart />
          </Card>

        </div>

        {/* ===INFO PANEL=== */}
        <div className="aside" style={{marginTop: '20px'}}>

          <div className="info-pane">

            <img src={coverPhoto} className="info-img pointer" alt="" onClick={() => {
              setIsDrawerOpen(true)
              axios.get('http://localhost:5000/photos/')
                .then(res => setPhotos(res.data))
                .catch(err => console.log(err))
            }}/>

            <div className="info-inner">
              <div className="flex-sb">
                <h1 className="heading">Info</h1>
                <i className="bp3-text-muted bp3-text-small" style={{ padding: '10px' }}>Click to edit</i>
              </div>

              <HTMLTable bordered={false}>
                <tbody>
                  <tr>
                    <td><i className="fas fa-map-marker"></i></td>
                    <td>
                      <div className="address-grid">
                        <div style={{ gridArea: 'streetLabel' }}> Street:</div>
                        <div style={{ gridArea: 'streetForm' }}>  <EditableText multiline={false} value={inputData.propertyStreet} minWidth={150} /></div>
                        <div style={{ gridArea: 'cityLabel' }}>   City:</div>
                        <div style={{ gridArea: 'cityForm' }}>    <EditableText multiline={false} value={inputData.propertyCity} minWidth={100}/></div>
                        <div style={{ gridArea: 'stateLabel' }}>  State:</div>
                        <div style={{ gridArea: 'stateForm' }}>   <EditableText multiline={false} value={inputData.propertyState} minWidth={30} /></div>
                        <div style={{ gridArea: 'zipLabel' }}>    Zip:</div>
                        <div style={{ gridArea: 'zipForm' }}>     <EditableText multiline={false} value={inputData.propertyZip} minWidth={50} /></div>
                      </div>
                      <div className="flex-sa mt10">
                        <a href="https://www.google.com/maps/place/Pullman+Square/">
                          <Button icon="map" minimal={true} small={true} text="View on map" intent="primary"/>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-square"></i></td>
                    <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <>
                        {property.units.length} units
                      </>
                      <>
                        <Button text="Add" icon="plus" intent="success" small={true} minimal={true} />
                      </>
                    </td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-ruler"></i></td>
                    {/* <td>15,000 square feet</td> */}
                    <td>Square footage: <EditableText multiline={false} value={editText} onChange={handleTextChange} maxLength={8} /></td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-hand-holding-usd"></i></td>
                    <td>Renting for $500 to $1300 per month</td>
                  </tr>
                </tbody>
              </HTMLTable>

            </div>
          </div>
        </div>
      </div>
      </>}
    </div>
  )
}

export default Property