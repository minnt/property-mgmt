import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {Button, HTMLTable, InputGroup, TextArea, Card, Elevation, FormGroup} from "@blueprintjs/core"

import {Context} from '../Context'
import LineChart from '../components/LineChart'
import image from '../img/house2.jpg'

function PropertyOverview() {

  let { propertyNo } = useParams()
  const { propertiesData } = useContext(Context)
  const property = propertiesData[propertyNo]

  const [isEditing, setIsEditing] = useState({address: false, utilities: false, events: false, notes: false, stats: false})

  function view() {
    return (
      <>
        <div className="main">

          {/* <div className="flex-sb">
            <p className="address">
              {property.street}<br />
              {`${property.city}, ${property.state} ${property.zip}`}<br />
              <Button className="mt10" icon="map" text="View on map" />
            </p>
          </div> */}

          <Card interactive={true} elevation={Elevation.ZERO} onClick={() => setIsEditing(prevInputData => ({...prevInputData, address: !isEditing.address}))} className="mt20">
            {
              isEditing.address ?
                <>
                  <InputGroup leftIcon="map-marker" className="mt10" placeholder="Street" />
                  <div className="flex-sb">
                    <InputGroup leftIcon="map-marker" className="mt10" placeholder="City" />
                    <InputGroup leftIcon="map-marker" className="mt10" placeholder="State" />
                    <InputGroup leftIcon="map-marker" className="mt10" placeholder="ZIP" />
                  </div>
                  <Button className="mt10" icon="plus" text="Add" />
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

          <Card interactive={true} elevation={Elevation.ZERO} onClick={() => setIsEditing(prevInputData => ({...prevInputData, utilities: !isEditing.utilities}))} className="mt20">
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

                  <InputGroup className="mt10" placeholder={property.utilities.power} />
                  <InputGroup className="mt10" placeholder={property.utilities.gas} />
                  <InputGroup className="mt10" placeholder={property.utilities.water} />
                  <InputGroup className="mt10" placeholder={property.utilities.sewage} />
                  <InputGroup className="mt10" placeholder={property.utilities.waste} />
                  <InputGroup className="mt10" placeholder={property.utilities.internet} />
                  <InputGroup className="mt10" placeholder={property.utilities.lawncare} />
                  <Button className="mt10" icon="plus" text="Add" />
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

          <Card interactive={true} elevation={Elevation.ZERO} onClick={() => setIsEditing(prevInputData => ({...prevInputData, events: !isEditing.events}))} className="mt20">
            <h1 className="heading">Events</h1>
            {
              isEditing.events ?
                <>
                  <p className="mt20">Edit:</p>
                  {
                    // INFO AS ID, FIX
                    property.events.map(event => {
                      return (
                        <div key={event.info} className="flex-sb">
                          <InputGroup className="mt10 width45" small={true} placeholder={event.date} />
                          <InputGroup className="mt10 width45" small={true} placeholder={event.info} />
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
                    property.events ?
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
      </>
    )
  }

  function edit() {
    return (
      <>
        <div className="main">

          <div className="flex-sb">
            <div>
              <h1 className="heading">Address</h1>
              <InputGroup leftIcon="map-marker" className="mt10" placeholder="Street" />
              <InputGroup leftIcon="map-marker" className="mt10" placeholder="City" />
              <InputGroup leftIcon="map-marker" className="mt10" placeholder="State" />
              <InputGroup leftIcon="map-marker" className="mt10" placeholder="ZIP" />
              <Button className="mt10" icon="plus" text="Add" />
            </div>
          </div>

          <div className="flex-sb">
            <div>
              <h1 className="heading">Utilities / Services</h1>
              <InputGroup className="mt10" placeholder="Power" />
              <InputGroup className="mt10" placeholder="Gas" />
              <InputGroup className="mt10" placeholder="Water" />
              <InputGroup className="mt10" placeholder="Sewage" />
              <InputGroup className="mt10" placeholder="Waste" />
              <InputGroup className="mt10" placeholder="Internet" />
              <InputGroup className="mt10" placeholder="Lawncare" />
              <Button className="mt10" icon="plus" text="Add" />
            </div>
          </div>

          <div className="flex-sb">
            <div>
              <h1 className="heading">Events</h1>
              <InputGroup leftIcon="timeline-events" className="mt10" placeholder="Date" />
              <InputGroup leftIcon="timeline-events" className="mt10" placeholder="Event Info" />
              <Button className="mt10" icon="plus" text="Add" />
            </div>
          </div>

          <div className="flex-sb">
            <div>
              <h1 className="heading">Notes</h1>
              <TextArea
                growVertically={true}
                rows="4" 
                cols="40"
              />
              <Button className="mt10" icon="plus" text="Add" />
            </div>
          </div>

        </div>
      </>
    )
  }

  console.log(isEditing)

  return (
    <div className="content">
      <div className="flex-sb ac">
        <h1 className="title noselect">
          {property.name}
        </h1>
        {
          isEditing ?
            <Button className="h20" icon="edit" text="Done" onClick={() => setIsEditing(!isEditing)} />
          :
            <Button className="h20" icon="edit" text="Edit" onClick={() => setIsEditing(!isEditing)} />
        }
      </div>
      <hr />
      <div className="content-inner">
        {/* {
          isEditing.address ?
            edit()
          :
            view()
        } */}
        {view()}
      </div>
    </div>
  )
}

export default PropertyOverview