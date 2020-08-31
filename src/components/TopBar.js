import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Tooltip, Navbar, Alignment, InputGroup, Button } from "@blueprintjs/core"
import { motion } from 'framer-motion'

import { Context } from '../Context'

function TopBar() {

  const {isDarkMode, toggleDarkMode} = useContext(Context)

  // const testData = ['Apple', 'Banana', 'Grapes', 'Peach', 'Pear', 'Cherry']

  // // Live search function
  // const handleChangeSearch = (event) => {
  //   //setSearchText(event.target.value)

  //   var searchQuery = event.target.value.toLowerCase()
  //   var searchResult = allWallpapers.filter(wall => {
  //     var searchValue = wall.title.toLowerCase()
  //     return searchValue.indexOf(searchQuery) !== -1
  //   })
  //   setDisplayedWallpapers(searchResult)
  // }

  return (
    <div className="navbar-container">
      <Navbar className="navbar-height-override">
        
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
          {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="30 50 150 100" height="40px" width="60px">
            <g className="lines">
              <path className="path" d="m 70.836203,107.5289 v -7.36418 q 0,-1.513893 -0.590161,-2.84817 -0.564502,-1.359936 -1.56521,-2.360644 -1.000708,-1.000708 -2.360644,-1.56521 -1.334277,-0.590162 -2.848169,-0.590162 -1.513892,0 -2.873828,0.590162 -1.334277,0.564502 -2.334985,1.56521 -1.000708,1.000708 -1.59087,2.360644 -0.564502,1.334277 -0.564502,2.84817 v 7.36418 z m 7.364185,14.70271 h -7.364185 v -7.36418 H 56.107834 v 7.36418 h -7.338525 v -22.06689 q 0,-3.053443 1.154663,-5.721998 1.154663,-2.694214 3.13042,-4.69563 2.001416,-2.001416 4.669971,-3.156079 2.694214,-1.154663 5.747656,-1.154663 3.053442,0 5.721997,1.154663 2.694214,1.154663 4.69563,3.156079 2.001416,2.001416 3.156079,4.69563 1.154663,2.668555 1.154663,5.721998 z" />
              <path className="path" d="m 97.624387,122.23161 q -2.540259,0 -4.772607,-0.94939 -2.232349,-0.97505 -3.925855,-2.64289 -1.667846,-1.69351 -2.642895,-3.92586 -0.94939,-2.23234 -0.94939,-4.7726 v -8.15962 h -3.412671 v -6.9793 H 85.33364 V 83.819822 h 6.979297 V 94.80195 h 10.622903 v 6.9793 H 92.312937 v 8.15962 q 0,1.10334 0.410547,2.07839 0.410547,0.94939 1.129004,1.66785 0.718457,0.71845 1.693506,1.15466 0.975048,0.41055 2.078393,0.41055 h 5.311453 v 6.97929 z" />
              <path className="path" d="m 113.89231,122.23161 h -7.05628 V 83.819822 h 7.05628 z" />
              <path className="path" d="m 145.86364,122.23161 h -1.6935 l -2.71987,-3.7719 q -1.00071,0.89808 -2.12972,1.69351 -1.10334,0.76978 -2.33498,1.35994 -1.23164,0.5645 -2.54026,0.89807 -1.28296,0.33357 -2.61724,0.33357 -2.89948,0 -5.4654,-0.97505 -2.54026,-0.97505 -4.4647,-2.82251 -1.89878,-1.87312 -3.00212,-4.56734 -1.10335,-2.69421 -1.10335,-6.13254 0,-3.2074 1.10335,-5.87595 1.10334,-2.694215 3.00212,-4.618654 1.92444,-1.924438 4.4647,-2.976465 2.56592,-1.077685 5.4654,-1.077685 1.33428,0 2.6429,0.333569 1.30862,0.333569 2.54026,0.923731 1.23164,0.590161 2.33498,1.385595 1.12901,0.795435 2.10406,1.719165 l 2.71987,-3.258716 h 1.6935 z m -7.05627,-13.98425 q 0,-1.43691 -0.5645,-2.77119 -0.53884,-1.35994 -1.48823,-2.3863 -0.94939,-1.05203 -2.23235,-1.66785 -1.2573,-0.64148 -2.69422,-0.64148 -1.43691,0 -2.71987,0.48752 -1.2573,0.48753 -2.20669,1.43692 -0.92373,0.94939 -1.46257,2.36064 -0.53884,1.3856 -0.53884,3.18174 0,1.79614 0.53884,3.2074 0.53884,1.38559 1.46257,2.33498 0.94939,0.94939 2.20669,1.43692 1.28296,0.48752 2.71987,0.48752 1.43692,0 2.69422,-0.61582 1.28296,-0.64148 2.23235,-1.66785 0.94939,-1.05202 1.48823,-2.3863 0.5645,-1.35994 0.5645,-2.79685 z" />
              <path className="path" d="m 166.26269,122.23161 h -16.01132 v -6.97929 h 16.01132 q 0.71846,0 1.23164,-0.51319 0.51319,-0.51318 0.51319,-1.23164 0,-0.74411 -0.51319,-0.97505 -0.51318,-0.23093 -1.23164,-0.23093 h -7.2872 q -1.8218,0 -3.41267,-0.6928 -1.59087,-0.69279 -2.77119,-1.87312 -1.18033,-1.20598 -1.87312,-2.79685 -0.66714,-1.59087 -0.66714,-3.41267 0,-1.8218 0.66714,-3.41267 0.69279,-1.590869 1.87312,-2.771191 1.18032,-1.180322 2.77119,-1.847461 1.59087,-0.692798 3.41267,-0.692798 h 14.18952 v 6.9793 h -14.18952 q -0.71846,0 -1.23164,0.51318 -0.51319,0.51318 -0.51319,1.23164 0,0.74412 0.51319,1.28296 0.51318,0.51318 1.23164,0.51318 h 7.2872 q 1.79615,0 3.38702,0.61582 1.59087,0.59017 2.77119,1.66785 1.18032,1.07769 1.87312,2.59158 0.6928,1.51389 0.6928,3.31003 0,1.8218 -0.6928,3.41267 -0.6928,1.56521 -1.87312,2.77119 -1.18032,1.18033 -2.77119,1.87312 -1.59087,0.66714 -3.38702,0.66714 z" />
            </g>
          </svg> */}
          <motion.h2 
            initial={{ y: -250 }}
            animate={{ y: 0 }}
          >
            Apex
          </motion.h2>
          </Navbar.Heading>

          <Navbar.Divider />
          <Link to="/" className="inherit-color">
            <Button className="bp3-minimal pointer" icon="home" text="Home" />
          </Link>
          <Link to="/about" className="inherit-color">
            <Button className="bp3-minimal pointer" icon="info-sign" text="About" />
          </Link>
          <Link to="/photos" className="inherit-color">
            <Button className="bp3-minimal pointer" icon="media" text="Photos" />
          </Link>
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <InputGroup type="search" placeholder="Search..."/>
          <Navbar.Divider />
          {
            isDarkMode ?
              <Tooltip content="Switch to light mode (Shift + D)">
                <Icon className="pointer" icon="moon" onClick={() => toggleDarkMode()} />
              </Tooltip>
            :
              <Tooltip content="Switch to dark mode (Shift + D)">
                <Icon className="pointer" icon="flash" onClick={() => toggleDarkMode()} />
              </Tooltip>
          }
          <Navbar.Divider />
          <Tooltip content="Settings">
            <Icon className="pointer" icon="cog" onClick={console.log('Clicked')} />
          </Tooltip>
          <Navbar.Divider />
          <Tooltip content="Log in / out">
            <Icon className="pointer" icon="user" onClick={console.log('Clicked')} />
          </Tooltip>
          &nbsp;Isaac
        </Navbar.Group>
      </Navbar>
      <div className='strips'></div>
    </div>
  )
}

export default TopBar