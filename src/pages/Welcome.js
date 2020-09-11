import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Card, Elevation} from "@blueprintjs/core"
// import anime from 'animejs'
import axios from 'axios'
import { motion } from 'framer-motion'

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
    // anime({
    //   targets: '.path',
    //   strokeDashoffset: [anime.setDashoffset, 0],
    //   easing: 'easeInOutSine',
    //   duration: 1500,
    //   delay: function(el, i) { return i * 250 },
    //   direction: 'alternate',
    //   loop: false
    // })
  }, [])

  return (
    <div className="content">
      <div className="welcome-grid">

        <div className="flex-sb" style={{ gridArea: 'title' }}>
          <h1 className="width100">
            Welcome to<br />
            Atlas Property Management
            <hr className="divider" />
          </h1>
        </div>

        <h1 className="heading" style={{ gridArea: 'text-recent', margin: 'auto', marginBottom: '10px' }}>Recently updated:</h1>

        <div className="flex-sa" style={{ gridArea: 'recent-update' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {
              properties.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn)).map(property => {
                var myDate = new Date(property.updatedOn)
                var month = myDate.getMonth() + 1
                var date = myDate.getDate()
                return (
                  <div style={{ flex: '1' }} key={property._id}>
                    <Link to={`/property/${property._id}`}>
                      <motion.img className="pointer" src={property.coverPhoto} alt='' whileHover={{ scale: 1.1 }} style={{ 
                        maxWidth: '75%',
                        height: 'auto',
                        borderRadius: '3px',
                        boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.2)',
                        marginBottom: '20px'
                      }}/>
                    </Link>
                    <p>{property.name}</p>
                    <p className="bp3-text-muted bp3-text-small">Updated on {month}/{date}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        <h1 className="heading" style={{ gridArea: 'text-info', margin: 'auto', marginBottom: '10px' }}>Info at a glance:</h1>

        <div className="flex-sb" style={{ gridArea: 'donut-chart', justifyContent: 'flex-end' }}>
          <Card elevation={Elevation.TWO}>
            <p style={{textAlign: 'center'}}>% of occupied units</p>
            <Chart />
          </Card>
        </div>

        <div className="flex-sb" style={{ gridArea: 'line-chart' }}>
          <Card elevation={Elevation.TWO} style={{ width: '500px' }}>
            <p style={{ textAlign: 'center' }}>Profits by month (in thousands)</p>
            <LineChart />
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Welcome