import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Button, HTMLTable, InputGroup, NumericInput, TextArea, FileInput, Checkbox, Card, Elevation} from "@blueprintjs/core"
import axios from 'axios'
// import {DatePicker} from "@blueprintjs/datetime"

function Unit() {

  let   { propertyId, unitNo }    = useParams()

  const [property,  setProperty]  = useState({})
  const [unit,      setUnit]      = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState({tenants: false, events: false})

  // Load property and unit data from DB
  useEffect(() => {
    function fetchData() {
      axios.get(`http://localhost:5000/residential/${propertyId}`)
        .then(res => {
          console.log('Loading properties data')
          setProperty(res.data)
          setUnit(res.data.units[unitNo])
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [propertyId, unitNo])

  return (
    <div className="content">
      {isLoading ?<>Loading...</>:<>
      <div className="flex-sb ac">
        <h1 className="title noselect">
          Unit {unit.unitNumber}
        </h1>
        <h2 className="subtitle noselect">
          {property.name}
        </h2>
      </div>
      <hr />
      <div className="content-inner">
        <div className="main">

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20">
            <p className="address">
              {`${property.street} Apt ${unit.unitNumber}`}<br />
              {`${property.city}, ${property.state} ${property.zip}`}<br />
            </p>
            <Button className="mt10" icon="map" text="View on map" />
          </Card>

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.tenants)
              setIsEditing(prevInputData => ({...prevInputData, tenants: true}))
          }}>
            <h1 className="heading">Tenants</h1>
            {
              isEditing.tenants ?
                <>Editing</>
              :
                <>                 
                  {
                    unit.tenants.length > 0 ?
                      <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Incidents</th>
                            <th>Documents</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            // DATE AS ID, FIX
                            unit.tenants.map(tenant => {
                              return (
                                <tr key={tenant.name}>
                                  <td>{tenant.name}</td>
                                  <td>{tenant.contact}</td>
                                  <td>{tenant.indidents}</td>
                                  <td>{tenant.docs}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </HTMLTable>
                    :
                      <>No tenants, unit vacant</>
                  }
                </>
            }
          </Card>

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
            if (!isEditing.events)
              setIsEditing(prevInputData => ({...prevInputData, events: true}))
          }}>
            <h1 className="heading">Events</h1>
            {
              isEditing.events ?
                <>Editing</>
              :
                <>                 
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
                            // DATE AS ID, FIX
                            unit.events.map(event => {
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
      </>}
    </div>
  )
}

export default Unit