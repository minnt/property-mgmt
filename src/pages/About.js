import React from 'react'

import {Callout, HTMLTable} from "@blueprintjs/core"

import express      from '../img/express.svg'
import react        from '../img/react.svg'
import mongodb      from '../img/mongodb.svg'
import nodejs       from '../img/nodejs.svg'
import javascript   from '../img/javascript.svg'

function About() {
  return (
    <div className='content'>
      <Callout style={{width: '200px'}}><b>Atlas Property Management</b> by Isaac B. copyright © 2020</Callout>
      Contact: email address

      <p className='heading' style={{paddingTop: '20px'}}>Tech used:</p>

      <HTMLTable>
        <thead>
          <tr>
            <th>Tech</th>
            <th>Description</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>React</td>
            <td>A JavaScript library for building user interfaces</td>
            <td><a href="https://reactjs.org/">reactjs.org</a></td>
          </tr>
          <tr>
            <td>NodeJS</td>
            <td>Javascript runtime</td>
            <td><a href="https://nodejs.org/en/">nodejs.org/en</a></td>
          </tr>
          <tr>
            <td>MongoDB</td>
            <td>A document database stores data in JSON-like documents</td>
            <td><a href="https://www.mongodb.com/">mongodb.com</a></td>
          </tr>
          <tr>
            <td>Express</td>
            <td>Fast, unopinionated, minimalist web framework for Node.js</td>
            <td><a href="https://expressjs.com/">expressjs.com</a></td>
          </tr>
          <tr>
            <td>BlueprintJS</td>
            <td>CSS framework and UI toolkit</td>
            <td><a href="https://blueprintjs.com/">blueprintjs.com</a></td>
          </tr>
          <tr>
            <td>Multer</td>
            <td>Node.js middleware for handling `multipart/form-data`</td>
            <td><a href="https://github.com/expressjs/multer">github.com/expressjs/multer</a></td>
          </tr>
          <tr>
            <td>ChartJS</td>
            <td>Simple yet flexible JavaScript charting</td>
            <td><a href="https://www.chartjs.org/">chartjs.org</a></td>
          </tr>
          <tr>
            <td>AnimeJS</td>
            <td>A lightweight JavaScript animation library with a simple, yet powerful API</td>
            <td><a href="https://animejs.com/">animejs.com</a></td>
          </tr>
        </tbody>
      </HTMLTable>

      <Callout style={{display: 'flex', width: '700px', justifyContent: 'space-around'}}>
        <img src={express}    alt='' width={100} />
        <img src={react}      alt='' width={100} />
        <img src={mongodb}    alt='' width={100} />
        <img src={nodejs}     alt='' width={100} />
        <img src={javascript} alt='' width={100} />
      </Callout>

      <p className='heading' style={{paddingTop: '30px'}}>Features:</p>
      <ul>
        <li>Global light / dark mode themes, uses localStorage to remember the user's preference.</li>
        <li>Allow for a wide array of property management related information to be entered and grouped into properties, individual units and tenants.</li>
        <li>Uses a MongoDB database for all data and images, full CRUD support.</li>
        <li>Images and documents can be uploaded to the database via GridFSStream.</li>
        <li>Responsive design that looks good on any screen.</li>
        <li>SVGs used when appropriate for sharper, dynamic images.</li>
        <li>Intuitive and snappy user interface via BlueprintJS.</li>
        <li>Important information is indexed and easily available with a live search.</li>
        <li>Large images are resized on the backend.</li>
        <li>User login to control access.</li>
      </ul>
    </div>
  )
}

export default About