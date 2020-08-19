import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Card, InputGroup, ControlGroup, Button, Callout, Elevation, Divider, HTMLTable} from "@blueprintjs/core"
import anime from 'animejs'
import axios from 'axios'

import Chart from '../components/Chart'
import LineChart from '../components/LineChart'

function Welcome() {
  const [properties, setProperties] = useState([])

  useEffect(() => {

    function fetchData() {
      axios.get(`http://localhost:5000/residential/`)
        .then(res => {
          setProperties(res.data)
        })
        .catch(err => console.log(err))
    }
    fetchData()

    // Animate logo svg
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

        <div className="flex-sa" style={{gridArea: 'recent-update'}}>
          <HTMLTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Updated</th>
              </tr>
            </thead>
            <tbody>
              {
                properties.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn)).map(property => {
                  return (
                    <tr key={property.name}>
                      <td>{property.name}</td>
                      <td>{property.updatedOn}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </HTMLTable>
        </div>

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