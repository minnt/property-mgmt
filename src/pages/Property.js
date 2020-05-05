import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {Button, Icon, Tooltip, ProgressBar} from "@blueprintjs/core"

import data from '../data/propertiesData'
import LineChart from '../components/LineChart'
import image from '../img/house2.jpg'

function PropertyOverview() {

  let { propertyNo } = useParams()

  // const [isEditing, setIsEditing] = useState(false)
  // const [test, setTest] = useState('')

  const property = data.residential[propertyNo]

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
              {property.addrLineOne}<br />
              {property.addrLineTwo}<br />
              <Button className="mt10" icon="map" text="View on map" />
            </p>
          </div>
          
          <div className="flex-sb mt20">
            <div>
              <h1 className="heading">Mortgage</h1><p></p>
              <p>
                Contract: $850,000 over 10 years, 3.55% APR<br />
                $411,513 remaining<br />
                Next payment: $3500 due on May 1st. [<Link to="#">Mark as paid</Link>]
              </p>
              <ProgressBar animate={false} stripes={true} value={0.47} intent="success"/>
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
              <h1 className="heading">Upcoming events</h1>
              <p>
                <Tooltip content="Important">
                  <Icon icon="warning-sign" iconSize={16} intent="danger" />
                </Tooltip>
                &nbsp;&nbsp;3-30-20: Maintenance to unit 6 - bees
              </p>
            </div>
          </div>

          <div className="flex-sb mt20">
            <div>
              <h1 className="heading">History</h1>
              <p>
                New tenant in unit 18 - <Link to="#">View tenant</Link><br />
                [<Link to="#">View complete history</Link>]
              </p>
            </div>
          </div>

          <LineChart />

          <div className="flex-sb mt20">
            <div>
              <h1 className="heading">Notes</h1>
              <p>
                No notes
              </p>
            </div>
          </div>

          <div className="flex-sb mt20">
            <div>
              <h1 className="heading">Test</h1>
              <p>
                Test test test test test test test<br />
                Test test test test test test test<br />
                Test test test test test test test<br />
                Test test test test test test test<br />
              </p>
            </div>
          </div>

        </div>

        <div className="aside">
          <div className="info-pane">
            <img src={image} className="info-img" alt=""/>
            <div className="info-inner">
              <h1 className="heading">Info</h1>
              <p>
                {property.unitsAmount} total units ({property.unitsVacant} vacant)<br />
                [<Link to="#">View tenant list</Link>]<br />
                15,000 square feet<br />
                Acquired: 3 June, 2009<br />
                Rent is $500 to $1300 per month<br />
                Expected income: $16,800<br />
                Expense: $11,000<br />
                Approx. profit: <b>$5,800</b><br />
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PropertyOverview