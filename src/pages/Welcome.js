import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Card, InputGroup, ControlGroup, Button, Callout, Elevation} from "@blueprintjs/core"
import anime from 'animejs'

import Chart from '../components/Chart'
import LineChart from '../components/LineChart'
// import { ELEVATION_2 } from '@blueprintjs/core/lib/esm/common/classes'



function Welcome() {

  useEffect(() => {
    // anime({
    //   targets: 'div',
    //   translateX: 250,
    //   rotate: '1turn',
    //   backgroundColor: '#FFF',
    //   duration: 800
    // })
    anime({
      targets: '.cls-1',
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
      <div className="content-inner center-text">
        <div className="flex-col-sb welcome__col">

          <div className="flex-sb">
            <h1 className="width100">
              Welcome to<br />
              Atlas Property Management
              <hr />
              {/* <svg id="wallhut_logo" data-name="logo" height="100" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 714.08 214.75">
                <title>Wallhut Logo</title>
                <path class="cls-1" d="M186.4,147.67a6.18,6.18,0,0,1,5.13,2.23,9.34,9.34,0,0,1,1.78,6q0,6.92-2.67,10.82a15.17,15.17,0,0,1-8,5.68,70.11,70.11,0,0,1-21.86,3.35,62.76,62.76,0,0,1-18.51-2.68q-6.47,10.49-14.27,21.63-8.93,12.72-15.28,17.4a23.63,23.63,0,0,1-14.38,4.68q-8.93,0-13.49-6.91t-5.69-22.75L78,170.86q-6.92,18.73-12.37,28.55T54.71,213a21.94,21.94,0,0,1-12.83,3.79,16.86,16.86,0,0,1-14.38-7.13q-5.25-7.14-6.58-22.53-2.67-31.21-2.68-54.64v-7.8q.23-7.36,4-10.26t11.37-2.9c3.87,0,6.73.86,8.59,2.56S45,118.67,45,122.69q0,25.65,3.12,66.68Q63.3,157.48,76,122.91q2.44-6.69,5.91-9a14.55,14.55,0,0,1,8.36-2.34q6,0,8.36,2.45t2.34,8.7q0,25.65,3.13,66.68,13.38-19.85,20.07-31.67a33.1,33.1,0,0,1-3.35-15.39,34.31,34.31,0,0,1,3.35-14.71,30.78,30.78,0,0,1,9.14-11.6,21,21,0,0,1,13.16-4.46A13.27,13.27,0,0,1,157,116.11q4,4.58,4,13.27,0,10-5.36,23A158.4,158.4,0,0,0,178.15,149l6-1.11A7.82,7.82,0,0,1,186.4,147.67Z" transform="translate(-16.24 -4.05)"/>
                <path class="cls-1" d="M179.26,206.77q-8.25-10-8.25-26.32a72.54,72.54,0,0,1,8.25-33.79,70.47,70.47,0,0,1,22-25.64q13.71-9.7,29.1-9.71c3.27,0,5.47.64,6.58,1.9s2.05,3.53,2.79,6.8a52.71,52.71,0,0,1,9.81-.89q10.94,0,10.93,7.81,0,4.68-3.34,22.3Q252,174.88,252,184.91a8.06,8.06,0,0,0,1.67,5.35,5.41,5.41,0,0,0,4.35,2q4.23,0,10.26-5.46t16.28-17.73a7.83,7.83,0,0,1,6-3.13,5.16,5.16,0,0,1,4.57,2.68,13.81,13.81,0,0,1,1.67,7.36q0,8.92-4.23,13.83A112.82,112.82,0,0,1,273.15,209q-10.26,7.8-19.84,7.8a20.86,20.86,0,0,1-13.5-5,30.58,30.58,0,0,1-9.25-13.72Q219,216.81,201.34,216.8,187.51,216.8,179.26,206.77Zm39.48-18.29q4.45-5.8,6.47-15.39l8.25-41a27,27,0,0,0-17.29,7A47.34,47.34,0,0,0,203.57,157a60.51,60.51,0,0,0-4.68,23.64q0,6.92,2.79,10.26a9.46,9.46,0,0,0,7.69,3.35Q214.27,194.28,218.74,188.48Z" transform="translate(-16.24 -4.05)"/>
                <path class="cls-1" d="M367.82,168.63A13.81,13.81,0,0,1,369.5,176q0,8.92-4.24,13.83a96.28,96.28,0,0,1-20.85,19.4,44.66,44.66,0,0,1-25.54,7.58q-19.62,0-29.1-17.84t-9.48-46.16q0-27.21,7-62T308.05,31q13.72-25,32.68-25,10.69,0,16.83,9.92t6.14,28.44Q363.7,70.95,349,106t-39.92,69.36q1.56,9.15,5.13,13.05a12.08,12.08,0,0,0,9.36,3.9A25.87,25.87,0,0,0,339.61,187q6.92-5.24,17.62-17.95a7.83,7.83,0,0,1,6-3.13A5.16,5.16,0,0,1,367.82,168.63Zm-43.6-122q-6.47,18.51-11.37,45.94a331.81,331.81,0,0,0-5.35,52.63,287.94,287.94,0,0,0,25.2-52.29q9.36-26.2,9.36-47.84,0-16.95-6.24-16.95Q330.69,28.13,324.22,46.64Z" transform="translate(-16.24 -4.05)"/>
                <path class="cls-1" d="M440.52,168.63A13.81,13.81,0,0,1,442.2,176q0,8.92-4.24,13.83a96.05,96.05,0,0,1-20.85,19.4,44.66,44.66,0,0,1-25.54,7.58q-19.62,0-29.1-17.84T353,152.8q0-27.21,7-62T380.76,31q13.71-25,32.67-25,10.69,0,16.84,9.92t6.13,28.44q0,26.54-14.72,61.55t-39.92,69.36q1.56,9.15,5.13,13.05a12.1,12.1,0,0,0,9.37,3.9A25.86,25.86,0,0,0,412.31,187q6.92-5.24,17.62-17.95a7.85,7.85,0,0,1,6-3.13A5.16,5.16,0,0,1,440.52,168.63Zm-43.6-122q-6.46,18.51-11.37,45.94a331.81,331.81,0,0,0-5.35,52.63,287.94,287.94,0,0,0,25.2-52.29q9.36-26.2,9.37-47.84,0-16.95-6.25-16.95Q403.39,28.13,396.92,46.64Z" transform="translate(-16.24 -4.05)"/>
                <path class="cls-1" d="M552.48,168.63a13.9,13.9,0,0,1,1.67,7.36q0,8.92-4.24,13.83a117.45,117.45,0,0,1-21.07,19.4,41.88,41.88,0,0,1-24.65,7.58q-11.37,0-17.17-6.58t-5.8-19.06q0-6.24,3.12-22.31,2.91-14,2.9-19.4c0-2.38-.81-3.57-2.45-3.57q-2.9,0-8.25,7.47a110.19,110.19,0,0,0-10.71,19.74A161,161,0,0,0,457.14,199q-4.25,17.85-21,17.84-6.69,0-8.81-4.79t-2.12-17.29q0-7.12.23-11.37l.22-17.84a385.71,385.71,0,0,1,7-71.59q7-37.24,20.74-62.56T486.35,6.05q10.26,0,16.62,8.81t6.35,22.86q0,22.53-13.15,46.72T453.35,141q-.68,11.6-.67,23.86,7.35-19,16.39-30.89t17.84-17.06q8.8-5.13,16.17-5.13,14.49,0,14.49,14.5,0,8.7-4.9,31.44-4.25,19.41-4.24,25.65,0,8.93,6.47,8.92,4.46,0,10.59-5.46t16.39-17.73a7.85,7.85,0,0,1,6-3.13A5.17,5.17,0,0,1,552.48,168.63Zm-79.73-129q-4.9,11.49-9.48,31a413.46,413.46,0,0,0-7.47,42.49,159.32,159.32,0,0,0,22.86-35.46q9-19.19,9-34.79,0-7.14-1.56-10.93t-4.46-3.79Q477.65,28.13,472.75,39.61Z" transform="translate(-16.24 -4.05)"/>
                <path class="cls-1" d="M542.44,207.55q-6.36-9.26-6.36-23.09a194.22,194.22,0,0,1,2.24-30.66,191.72,191.72,0,0,1,7.35-29.55q2.24-6.69,6.25-9.59t12.71-2.9q4.9,0,6.8,1.56a5.73,5.73,0,0,1,1.9,4.69q0,1.78-2.45,12-2.24,8.25-3.57,14.94-4.47,23.41-4.46,31.22,0,4.69,1.11,6.58a3.82,3.82,0,0,0,3.57,1.9q3.35,0,8.36-6.69t10.71-20.3a271.26,271.26,0,0,0,11-33.45q1.79-6.69,5.46-9.59c2.45-1.93,6.14-2.9,11-2.9q5.13,0,7.14,1.23t2,4.57q0,5.58-5.58,30.55-6.24,28.56-6.25,35.24a10.64,10.64,0,0,0,1.79,6.58,5.61,5.61,0,0,0,4.68,2.34c3,0,6.5-1.82,10.6-5.46s9.55-9.56,16.39-17.73a7.83,7.83,0,0,1,6-3.13,5.16,5.16,0,0,1,4.57,2.68,13.81,13.81,0,0,1,1.67,7.36q0,8.92-4.23,13.83a98.71,98.71,0,0,1-20.63,19.4,43.24,43.24,0,0,1-25.09,7.58q-10.71,0-15.73-8.25t-5-23.19q-3.79,15.16-11.38,23.3t-16.28,8.14Q548.79,216.8,542.44,207.55Z" transform="translate(-16.24 -4.05)"/>
                <path class="cls-1" d="M675.92,133q-.45,11.15-.45,17.39,0,16.07,1.67,25.09t5.58,12.94q3.9,3.9,10.81,3.9A21.09,21.09,0,0,0,702,190a35.27,35.27,0,0,0,8.92-5.8,7.38,7.38,0,0,1,4.9-2.23c1.79,0,3.24,1,4.35,3a14.69,14.69,0,0,1,1.68,7.25,21.13,21.13,0,0,1-1.68,8.25,16.48,16.48,0,0,1-5,6.69,40.17,40.17,0,0,1-26.32,9.59q-21.2,0-31-17.73T648,152.8q0-9.81.67-19.85H640q-6.69,0-9-2.46c-1.56-1.63-2.35-4.23-2.35-7.8q0-12.5,10-12.49h12.71A216.91,216.91,0,0,1,663,65.37q7.8-20.28,18.85-32.33t23.75-12q9.36,0,14.72,8.25T725.65,50q0,34.58-29,60.22h25q3.57,0,5.13,1.56c1,1,1.56,3,1.56,5.8q0,15.39-25.2,15.39Zm16.16-82.18Q688,59.13,684.28,74a310.54,310.54,0,0,0-6.13,32.89,76.07,76.07,0,0,0,19.73-25.53q6.58-14.16,6.58-25.76,0-13.15-4.91-13.16C697.33,42.4,694.83,45.19,692.08,50.77Z" transform="translate(-16.24 -4.05)"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 210 297" height="120px" width="180px">
                <g class="lines">
                  <path class="cls-1" d="m 70.836203,107.5289 v -7.36418 q 0,-1.513893 -0.590161,-2.84817 -0.564502,-1.359936 -1.56521,-2.360644 -1.000708,-1.000708 -2.360644,-1.56521 -1.334277,-0.590162 -2.848169,-0.590162 -1.513892,0 -2.873828,0.590162 -1.334277,0.564502 -2.334985,1.56521 -1.000708,1.000708 -1.59087,2.360644 -0.564502,1.334277 -0.564502,2.84817 v 7.36418 z m 7.364185,14.70271 h -7.364185 v -7.36418 H 56.107834 v 7.36418 h -7.338525 v -22.06689 q 0,-3.053443 1.154663,-5.721998 1.154663,-2.694214 3.13042,-4.69563 2.001416,-2.001416 4.669971,-3.156079 2.694214,-1.154663 5.747656,-1.154663 3.053442,0 5.721997,1.154663 2.694214,1.154663 4.69563,3.156079 2.001416,2.001416 3.156079,4.69563 1.154663,2.668555 1.154663,5.721998 z" />
                  <path class="cls-1" d="m 97.624387,122.23161 q -2.540259,0 -4.772607,-0.94939 -2.232349,-0.97505 -3.925855,-2.64289 -1.667846,-1.69351 -2.642895,-3.92586 -0.94939,-2.23234 -0.94939,-4.7726 v -8.15962 h -3.412671 v -6.9793 H 85.33364 V 83.819822 h 6.979297 V 94.80195 h 10.622903 v 6.9793 H 92.312937 v 8.15962 q 0,1.10334 0.410547,2.07839 0.410547,0.94939 1.129004,1.66785 0.718457,0.71845 1.693506,1.15466 0.975048,0.41055 2.078393,0.41055 h 5.311453 v 6.97929 z" />
                  <path class="cls-1" d="m 113.89231,122.23161 h -7.05628 V 83.819822 h 7.05628 z" />
                  <path class="cls-1" d="m 145.86364,122.23161 h -1.6935 l -2.71987,-3.7719 q -1.00071,0.89808 -2.12972,1.69351 -1.10334,0.76978 -2.33498,1.35994 -1.23164,0.5645 -2.54026,0.89807 -1.28296,0.33357 -2.61724,0.33357 -2.89948,0 -5.4654,-0.97505 -2.54026,-0.97505 -4.4647,-2.82251 -1.89878,-1.87312 -3.00212,-4.56734 -1.10335,-2.69421 -1.10335,-6.13254 0,-3.2074 1.10335,-5.87595 1.10334,-2.694215 3.00212,-4.618654 1.92444,-1.924438 4.4647,-2.976465 2.56592,-1.077685 5.4654,-1.077685 1.33428,0 2.6429,0.333569 1.30862,0.333569 2.54026,0.923731 1.23164,0.590161 2.33498,1.385595 1.12901,0.795435 2.10406,1.719165 l 2.71987,-3.258716 h 1.6935 z m -7.05627,-13.98425 q 0,-1.43691 -0.5645,-2.77119 -0.53884,-1.35994 -1.48823,-2.3863 -0.94939,-1.05203 -2.23235,-1.66785 -1.2573,-0.64148 -2.69422,-0.64148 -1.43691,0 -2.71987,0.48752 -1.2573,0.48753 -2.20669,1.43692 -0.92373,0.94939 -1.46257,2.36064 -0.53884,1.3856 -0.53884,3.18174 0,1.79614 0.53884,3.2074 0.53884,1.38559 1.46257,2.33498 0.94939,0.94939 2.20669,1.43692 1.28296,0.48752 2.71987,0.48752 1.43692,0 2.69422,-0.61582 1.28296,-0.64148 2.23235,-1.66785 0.94939,-1.05202 1.48823,-2.3863 0.5645,-1.35994 0.5645,-2.79685 z" />
                  <path class="cls-1" d="m 166.26269,122.23161 h -16.01132 v -6.97929 h 16.01132 q 0.71846,0 1.23164,-0.51319 0.51319,-0.51318 0.51319,-1.23164 0,-0.74411 -0.51319,-0.97505 -0.51318,-0.23093 -1.23164,-0.23093 h -7.2872 q -1.8218,0 -3.41267,-0.6928 -1.59087,-0.69279 -2.77119,-1.87312 -1.18033,-1.20598 -1.87312,-2.79685 -0.66714,-1.59087 -0.66714,-3.41267 0,-1.8218 0.66714,-3.41267 0.69279,-1.590869 1.87312,-2.771191 1.18032,-1.180322 2.77119,-1.847461 1.59087,-0.692798 3.41267,-0.692798 h 14.18952 v 6.9793 h -14.18952 q -0.71846,0 -1.23164,0.51318 -0.51319,0.51318 -0.51319,1.23164 0,0.74412 0.51319,1.28296 0.51318,0.51318 1.23164,0.51318 h 7.2872 q 1.79615,0 3.38702,0.61582 1.59087,0.59017 2.77119,1.66785 1.18032,1.07769 1.87312,2.59158 0.6928,1.51389 0.6928,3.31003 0,1.8218 -0.6928,3.41267 -0.6928,1.56521 -1.87312,2.77119 -1.18032,1.18033 -2.77119,1.87312 -1.59087,0.66714 -3.38702,0.66714 z" />
                </g>
              </svg> */}

              {/* <div className="line-drawing-demo">
                <img src={logo} alt='' />
              </div> */}
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
              <ControlGroup fill={false} vertical={false}>
                <Link to='/list/all'><Button>All</Button></Link>
                <Link to='/list/residential'><Button>Residential</Button></Link>
                <Link to='/list/commercial'><Button>Commercial</Button></Link>
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
              <p>% of occupied units</p>
              <Chart />
            </Card>
            <Card elevation={Elevation.TWO} style={{width: '500px'}}>
              <p>Profits by month (in thousands)</p>
              <LineChart />
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Welcome