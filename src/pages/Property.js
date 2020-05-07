import React, {useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Button, HTMLTable} from "@blueprintjs/core"

import {Context} from '../Context'
import LineChart from '../components/LineChart'
import image from '../img/house2.jpg'

function PropertyOverview() {

  let { propertyNo } = useParams()
  const { propertiesData } = useContext(Context)

  // const [isEditing, setIsEditing] = useState(false)
  // const [test, setTest] = useState('')

  const property = propertiesData[propertyNo]
  console.log(property)

  // function view() {
  //   return (
  //     <>
  //     </>
  //   )
  // }

  // function edit() {
  //   return (
  //     <>
  //       <div className="flex-sb">
  //         <div>
  //           <h1 className="heading">Utilities</h1>
  //           Power: <InputGroup placeholder="Power" />
  //           {/* <DatePicker />   */}
  //           <Button className="mt10" icon="plus" text="Add" />
  //         </div>
  //       </div>
  //     </>
  //   )
  // }

  return (
    <div className="content">

      <div className="flex-sb ac">
        <h1 className="title noselect">
          {property.name}
        </h1>
        <Button className="h20" icon="edit" text="Edit" />
      </div>

      <hr />

      <div className="content-inner">
        <div className="main">

          <div className="flex-sb">
            <p className="address">
              {property.street}<br />
              {`${property.city}, ${property.state} ${property.zip}`}<br />
              <Button className="mt10" icon="map" text="View on map" />
            </p>
          </div>

          <div className="flex-sb mt20">
            <div>
              <h1 className="heading">Utilities</h1>
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
                  <>No utilities information submitted</>
              }
            </div>
          </div>

          <div className="flex-sb mt20">
            <div>
              <h1 className="heading">Events</h1>
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
                    property.events.map(item => {
                      return (
                        <tr key={item.date}>
                          <td>{item.date}</td>
                          <td>{item.info}</td>
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
              <h1 className="heading">Stats</h1>
              <LineChart />
            </div>
          </div>

          <div className="flex-sb mt20">
            <div>
              <h1 className="heading">Notes</h1>
                {
                  property.notes.length > 0 ?
                    <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
                      <tbody>
                        {
                          // NOTE AS ID, FIX
                          property.notes.map(item => {
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
                  <>No notes</>
              }
            </div>
          </div>

        </div>

        <div className="aside">
          <div className="info-pane">
            <img src={image} className="info-img" alt=""/>
            <div className="info-inner">
              <h1 className="heading">Info</h1>
              <p>
                {property.units.length} units<br />
                [<Link to="#">View tenant list</Link>]<br />
                15,000 square feet<br />
                Rent is $500 to $1300 per month<br />
                Income: $16,800<br />
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PropertyOverview