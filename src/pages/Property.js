import React, {useState, useRef, useLayoutEffect, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Button, HTMLTable, InputGroup, Card, Elevation} from "@blueprintjs/core"
import axios from 'axios'

// import {Context} from '../Context'
import {AppToaster} from "../utils/toaster"
import LineChart from '../components/LineChart'
import image from '../img/house2.jpg'

function PropertyOverview() {

  let   { propertyId }            = useParams()
  // const { propertiesData }        = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)
  const [property,  setProperty]  = useState({})
  const [isEditing, setIsEditing] = useState({address: false, utilities: false, events: false, notes: false, stats: false})
  const [inputData, setInputData] = useState({})

  // Load property data from DB
  useEffect(() => {
    function fetchData() {
      axios.get(`http://localhost:5000/residential/${propertyId}`)
        .then(res => {
          console.log('Loading properties data')
          setProperty(res.data)

          setInputData({
            propertyName:       res.data.name, 
            propertyNoOfUnits:  0, 
            propertyStreet:     res.data.street,
            propertyCity:       res.data.city, 
            propertyState:      res.data.state, 
            propertyZip:        res.data.zip,
        
            propertyPower:      res.data.utilities.power,
            propertyGas:        res.data.utilities.gas,
            propertyWater:      res.data.utilities.water,
            propertySewage:     res.data.utilities.sewage,
            propertyWaste:      res.data.utilities.waste,
            propertyInternet:   res.data.utilities.internet,
            propertyLawncare:   res.data.utilities.lawncare,

            propertyEvents:     res.data.events
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
    axios.post(`http://localhost:5000/residential/update/${property._id}`, property)
      .then(res => console.log(res.data))
    console.log('New property data submitted to DB')
  }, [property])

  function handleChange(event) {
    const {name, value} = event.target
    setInputData(prevInputData => ({...prevInputData, [name]: value}))
  }

  function handleChangeEvents(event, index, type) {
    const value = event.target.value

    let newPropertyEvent = inputData.propertyEvents
    if (type === 'date') {
      newPropertyEvent[index].date = value
    } else if (type === 'info') {
      newPropertyEvent[index].info = value
    }
    setInputData(prevInputData => ({
      ...prevInputData,
      propertyEvents: newPropertyEvent
    }))
  }

  const showToast = () => {
    // create toasts in response to interactions.
    // in most cases, it's enough to simply create and forget (thanks to timeout).
    AppToaster.show({message: "Changes saved", intent: "success"})
  }

  return (
    <div className="content">
      {isLoading ? <>Loading...</>:<>
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
              setIsEditing(prevInputData => ({...prevInputData, address: true}))
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
                      showToast()
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
              setIsEditing(prevInputData => ({...prevInputData, utilities: true}))
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
                        utilities: newUtilities
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

          <Card interactive={true} elevation={Elevation.ZERO} onClick={() => setIsEditing(prevInputData => ({...prevInputData, events: true}))} className="mt20">
            <h1 className="heading">Events</h1>
            {
              isEditing.events ?
                <>
                  <p className="mt20">Edit:</p>
                  {
                    // INFO AS ID, FIX
                    property.events.map((propertyEvent, index) => {
                      return (
                        <div key={propertyEvent.id} className="flex-sb">
                          <InputGroup className="mt10 width45" small={true} value={inputData.propertyEvents[index].date} onChange={(e) => {handleChangeEvents(e, index, 'date')}} />
                          <InputGroup className="mt10 width45" small={true} value={inputData.propertyEvents[index].info} onChange={(e) => {handleChangeEvents(e, index, 'info')}} />
                        </div>
                      )
                    })
                  }
                  <p className="mt20">New:</p>
                  <div className="flex-sb">
                    <InputGroup className="mt10 width45" placeholder="New event date" />
                    <InputGroup className="mt10 width45" placeholder="New event info" />
                  </div>
                  <Button className="mt10" icon="plus" text="Add" />
                </>
              :
                <>
                  {
                    property.events.length > 0 ?
                      <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Event Info</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            // DATE AS ID, FIX
                            property.events.map(event => {
                              return (
                                <tr key={event.date}>
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

          <Card interactive={true} elevation={Elevation.ZERO} onClick={() => setIsEditing(prevInputData => ({...prevInputData, notes: !isEditing.notes}))} className="mt20">
            <h1 className="heading">Notes</h1>
            {
              isEditing.notes ? 
                <>
                  <p className="mt20">Edit:</p>
                  {
                    // INFO AS ID, FIX
                    property.notes.map(note => {
                      return (
                        <InputGroup key={note} className="mt10 width45" small={true} placeholder={note} />
                      )
                    })
                  }
                  <p className="mt20">New:</p>
                  <InputGroup className="mt10 width45" placeholder="New note" />
                  <Button className="mt10" icon="plus" text="Add" />
                </>
              :
                <>
                  {
                    property.notes.length > 0 ?
                      <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                        <tbody>
                          {
                            // NOTE AS ID, FIX
                            property.notes.map(note => {
                              return (
                                <tr key={note}>
                                  <td>{note}</td>
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