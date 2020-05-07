import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {Button, HTMLTable, InputGroup, NumericInput, TextArea, FileInput, Checkbox} from "@blueprintjs/core"
// import {DatePicker} from "@blueprintjs/datetime"

import {Context} from '../Context'

function Unit() {

  let { propertyNo, unitNo } = useParams()
  const { propertiesData } = useContext(Context)

  const [isEditing, setIsEditing] = useState(false)

  const property = propertiesData[propertyNo]
  const unit = propertiesData[propertyNo].units[unitNo]

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
  const { propertiesData } = useContext(Context)
  
  const property = propertiesData[propertyNo]
  const unit = propertiesData[propertyNo].units[unitNo]

  return (
    <div className="content-inner">

      <div className="main">

        <div className="flex-sb">
          <p className="address">
            {`${property.street} Apt ${unit.unitNumber}`}<br />
            {`${property.city}, ${property.state} ${property.zip}`}<br />
            <Button className="mt10" icon="map" text="View on map" />
          </p>
        </div>
          
        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Events</h1><p></p>
            {
              unit.events.length > 0 ?
                <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // EVENT AS ID, FIX
                      unit.events.map(item => {
                        return (
                          <tr key={item}>
                            <td>{item}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </HTMLTable>
              :
                <>No events</>
            }
          </div>
        </div>

        <div className="flex-sb mt20">
          <div>
            <h1 className="heading">Tenants</h1><p></p>
            {
              unit.tenants.length > 0 ?
                <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // EVENT AS ID, FIX
                      unit.tenants.map(item => {
                        return (
                          <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.contact}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </HTMLTable>
              :
                <>No tenants</>
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

      </div>

      <div className="aside">

        <div className="info-pane">
          <div className="info-inner">
            <h1 className="heading">Info</h1>
            <p>
              {unit.bedrooms} bedroom / {unit.bathrooms} bath<br />
              {unit.tenants.length} tenants<br />
              {unit.sqFt} square feet<br />
              Rent is ${unit.rent} per month<br />
              {unit.keys} keys supplied<br />
              {
                unit.pets ?
                  "Pets allowed"
                :
                  "Pets not allowed"
              }
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Unit