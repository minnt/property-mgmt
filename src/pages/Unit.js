import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'

import {Button, HTMLTable, InputGroup, NumericInput, TextArea, FileInput, Checkbox} from "@blueprintjs/core"
// import {DatePicker} from "@blueprintjs/datetime"

import data from '../data/propertiesData'

function Unit() {

  let { propertyNo, unitNo } = useParams()

  const [isEditing, setIsEditing] = useState(false)

  const property = data.residential[propertyNo]
  const unit = data.residential[propertyNo].units[unitNo]


  return (
    <div className="content">
      <div className="flex-sb ac">
        <h1 className="title noselect">
          Unit {unit.unitNumber}
        </h1>
        <h2 className="subtitle noselect">
          {property.name}
        </h2>

        {
          isEditing ?
            <Button className="h20" icon="edit" text="Done" onClick={() => setIsEditing(!isEditing)} />
          :
            <Button className="h20" icon="edit" text="Edit" onClick={() => setIsEditing(!isEditing)} />
        }
        
      </div>

      <hr />

      {
        isEditing ?
          <Edit />
        :
          <View />
      }

    </div>
  )
}


function Edit() {

  const [inputEvents, setInputEvents] = useState('')

  const handleInputEvents = (e) => {
    setInputEvents(e.target.value)
  }

  return (
    <div className="content-inner">

      <div className="main">

        <div className="flex-sb">
          <div>
            <h1 className="heading">Schedule</h1>
            <InputGroup leftIcon="timeline-events" value={inputEvents} placeholder="Schedule a new event"
              onChange={handleInputEvents}/>
            {/* <DatePicker />   */}
            <Button className="mt10" icon="plus" text="Add" />
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Tenants</h1>
            <InputGroup leftIcon="person" value={inputEvents} placeholder="First name"
              onChange={handleInputEvents}/>
            <InputGroup leftIcon="person" value={inputEvents} placeholder="Last name"
              onChange={handleInputEvents} className="mt10"/>
            <Button className="mt10" icon="plus" text="Add" />
          </div>
        </div>

        <div className="flex-sb mt20 space">
          <div>
            <h1 className="heading">Maintenance Log</h1>
            <InputGroup leftIcon="calendar" value={inputEvents} placeholder="Date"
              onChange={handleInputEvents} className="mt10"/>
            <InputGroup leftIcon="id-number" value={inputEvents} placeholder="Technician"
              onChange={handleInputEvents} className="mt10"/>
            <InputGroup leftIcon="issue" value={inputEvents} placeholder="Issue"
              onChange={handleInputEvents} className="mt10"/>
            <Checkbox checked={true} className="mt10">
              Resolved?
            </Checkbox>
            <Button className="mt10" icon="plus" text="Add" />
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Documents</h1>
            <FileInput text="Upload new file..." /><br />
            or [link exisiting document(s)]
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Notes</h1>
            <TextArea cols={60} row={3}/><br />
            <Button className="mt10" icon="plus" text="Add" />
          </div>
        </div>

      </div>

      <div className="aside al">

        <div className="flex-sb">
          <div>
            <h1 className="heading">Unit 1</h1>
            Rent: <NumericInput />
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Images</h1>
            <FileInput text="Upload new images..." /><br />
          </div>
        </div>

      </div>

    </div>
  )
}


function View() {

  let { unitNo, propertyNo } = useParams()
  
  const property = data.residential[propertyNo]
  const unit = data.residential[propertyNo].units[unitNo]

  return (
    <div className="content-inner">

      <div className="main">

        <div className="flex-sb">
          <p className="address">
            {unit.addrLineOne}<br />
            {unit.addrLineTwo}<br />
            <Button className="mt10" icon="map" text="View on map" />
          </p>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Maintenance Scheduled</h1>
            <p>
              None
            </p>
          </div>
        </div>
          
        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Maintenance History</h1><p></p>

            <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Technician</th>
                  <th>Issue Resolved?</th>
                </tr>
              </thead>
              <tbody>
                {
                  // DATE AS ID, FIX
                  unit.maintenanceHistory.map(item => {
                    return (
                      <tr key={item.date}>
                        <td>{item.date}</td>
                        <td>{item.issue}</td>
                        <td>{item.technician}</td>
                        <td>{item.resolved}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </HTMLTable>
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Utilities</h1>
            {
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
                <>No utilities information submitted.</>
            }
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Lease Agreements</h1>
            <p>
              [Click to view lease]<br />
              Expires 04-01-21
            </p>
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Notes</h1>
            <p>
              No notes
            </p>
          </div>
        </div>

      </div>

      <div className="aside">

        <div className="info-pane">
          <div className="info-inner">
            <h1 className="heading">Info</h1>
            <p>
              {unit.bedrooms} bedroom / {unit.bathrooms} bath<br />
              {unit.tenants.length} tenants<br />
              [<Link to="#">View tenant list</Link>]<br />
              {unit.sqFt} square feet<br />
              Rent is ${unit.rent} per month<br />
              {unit.keys} keys supplied<br />
              {
                unit.pets ?
                  "Pets: Yes"
                :
                  "Pets: No"
              }
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Unit