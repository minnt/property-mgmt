import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Card, InputGroup, ControlGroup, Button, Callout, Elevation, Divider, HTMLTable} from "@blueprintjs/core"
import anime from 'animejs'

import Chart from '../components/Chart'
import LineChart from '../components/LineChart'

function Welcome() {

  useEffect(() => {
    anime({
      targets: '.path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'alternate',
      loop: false
    })
  }, [])

  return (
    <div className="content">
      <div className="welcome-grid">

        <div className="flex-sb" style={{gridArea: 'title'}}>
          <h1 className="width100">
            Welcome to<br />
            Atlas Property Management
            <hr />
          </h1>
        </div>

        <h1 className="heading" style={{gridArea: 'text-recent', margin: 'auto'}}>Recently updated:</h1>

        <div className="flex-sb" style={{gridArea: 'info'}}>
          <Callout icon="info-sign">
            Use the tree menu to the left to navigate properties or search below. [recently updated, recent photos]
          </Callout>
        </div>

        <div className="flex-sb" style={{gridArea: 'prop-cat'}}>
          <Card elevation={Elevation.TWO}>
            <p>Click below to view your respective properties.</p>
            <ControlGroup fill={false} vertical={false} style={{display: 'flex', justifyContent: 'center'}}>
              <Link to='/list/all'><Button>All</Button></Link>
              <Link to='/list/residential'><Button>Residential</Button></Link>
              <Link to='/list/commercial'><Button>Commercial</Button></Link>
            </ControlGroup>
            <Divider />
            Recently updated:
            <HTMLTable>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Shady Oaks</td>
                </tr>
              </tbody>
            </HTMLTable>
          </Card>
        </div>

        <div style={{gridArea: 'search'}}>
          <Card elevation={Elevation.TWO}>
            <div className="flex-sb">
              <div className="flex-sb" style={{flexDirection: 'column'}}>
                Search properties:
                <InputGroup className="mt10" type="search" placeholder="Search..." style={{width: '200px'}}/>
              </div>
              <Divider />
              <div className="flex-sb" style={{flexDirection: 'column'}}>
                Search tenants:
                <InputGroup className="mt10" type="search" placeholder="Search..." style={{width: '200px'}}/>
              </div>
            </div>
          </Card>
        </div>

        {/* <div style={{gridArea: 'search-tenant'}}>
          <Card elevation={Elevation.TWO}>
            Search tenants:
            <InputGroup className="mt10" type="search" placeholder="Search..." style={{width: '300px'}}/>
          </Card>
        </div> */}

        <h1 className="heading" style={{gridArea: 'text-info', margin: 'auto'}}>Info at a glance:</h1>

        <div className="flex-sb" style={{gridArea: 'donut-chart', justifyContent: 'flex-end'}}>
          <Card elevation={Elevation.TWO}>
            <p style={{textAlign: 'center'}}>% of occupied units</p>
            <Chart />
          </Card>
        </div>

        <div className="flex-sb" style={{gridArea: 'line-chart'}}>
          <Card elevation={Elevation.TWO} style={{width: '500px'}}>
            <p style={{textAlign: 'center'}}>Profits by month (in thousands)</p>
            <LineChart />
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Welcome