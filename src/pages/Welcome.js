import React from 'react'
import {Link} from 'react-router-dom'
import {Card, InputGroup, ControlGroup, Button, Callout, Elevation} from "@blueprintjs/core"

import Chart from '../components/Chart'
// import { ELEVATION_2 } from '@blueprintjs/core/lib/esm/common/classes'

function Welcome() {
  return (
    <div className="content">
      <div className="content-inner center-text">
        <div className="flex-col-sb welcome__col">

          <div className="flex-sb">
            <h1 className="width100">
              Welcome to<br />
              Atlas Property Management
            </h1>
          </div>

          <div className="flex-sb">
            <Callout icon="info-sign">
              Use the tree menu to the left to navigate properties or search below.
            </Callout>
          </div>

          <div className="flex-sb">
            <Card elevation={Elevation.TWO}>
              {/* <Link to="/all">View all properties</Link> */}
              <p>Click below to view your respective properties.</p>
              <ControlGroup fill={true} vertical={false}>
                <Button>All</Button>
                <Button>Residential</Button>
                <Button>Commercial</Button>
              </ControlGroup>
            </Card>
            <Card elevation={Elevation.TWO}>
              Search properties:
              <InputGroup className="mt10" type="search" placeholder="Search..." style={{width: '300px'}}/>
            </Card>
            <Card elevation={Elevation.TWO}>
              Search tenants:
              <InputGroup className="mt10" type="search" placeholder="Search..." style={{width: '300px'}}/>
            </Card>
          </div>

          <h1 className="heading">Info at a glance:</h1>
          <div className="flex-sb">
            <Card elevation={Elevation.TWO}>
              <Chart />
              <p>% of occupied units</p>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Welcome