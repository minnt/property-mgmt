import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Button, HTMLTable, Card, Elevation} from "@blueprintjs/core"
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
        <h2 className="noselect" style={{fontSize: '14px'}}>
          {property.name}
        </h2>
      </div>
      <hr />
      <div className="content-inner">
        <div className="main">

          <Card interactive={true} elevation={Elevation.ZERO} className="mt20" style={{height: '200px'}}>
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
              {/* <p>
                <i className="fas fa-building"></i> {unit.bedrooms} bedroom / {unit.bathrooms} bath<br />
                <i className="fas fa-user-friends"></i> {unit.tenants.length} tenants<br />
                <i className="fas fa-ruler"></i> {unit.sqFt} square feet<br />
                <i className="fas fa-hand-holding-usd"></i> Rent is ${unit.rent} per month<br />
                <i className="fas fa-key"></i> {unit.keys} keys supplied<br />
                {
                  unit.pets ?
                    <>
                      <i className="fas fa-paw"></i>
                      &nbsp;Pet deposit on file
                    </>
                  :
                    <>
                      <i className="fas fa-paw"></i>
                      &nbsp;No pet deposit on file
                    </>
                }
              </p> */}
              <HTMLTable bordered={false}>
                <tbody>
                  <tr>
                    <td><i className="fas fa-building"></i></td>
                    <td>{unit.bedrooms} bedroom / {unit.bathrooms} bath</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-user-friends"></i></td>
                    <td>{unit.tenants.length} tenants</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-ruler"></i></td>
                    <td>{unit.sqFt} square feet</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-hand-holding-usd"></i></td>
                    <td>Rent is ${unit.rent} per month</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-key"></i></td>
                    <td>{unit.keys} keys supplied</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-paw"></i></td>
                    {
                      unit.pets ?
                        <td>
                          Pet deposit on file
                        </td>
                      :
                        <td>
                          No pet deposit on file
                        </td>
                    }
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

export default Unit