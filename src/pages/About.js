import React from 'react'

function About() {
  return (
    <>
      <p>Atlas Property Management by Isaac B.  (c) 2020</p>
      <p>Tech used: MongoDB, Express, React, NodeJS, BlueprintJS, Multer, ChartJS, AnimeJS</p>
      <p>Features:</p>
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
    </>
  )
}

export default About