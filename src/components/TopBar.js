import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import {Icon, Tooltip, Navbar, Alignment, InputGroup, Button} from "@blueprintjs/core"

import {Context} from '../Context'


function TopBar() {

  const {isDarkMode, toggleDarkMode} = useContext(Context)

  return (

    <Navbar className="navbar-height-override">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Atlas</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/">
          <Button className="bp3-minimal pointer" icon="home" text="Home" />
        </Link>
        <Link to="/about">
          <Button className="bp3-minimal pointer" icon="info-sign" text="About" />
        </Link>
        <Link to="/photos">
          <Button className="bp3-minimal pointer" icon="media" text="Photos" />
        </Link>
        <Link to="/photos">
          <Button className="bp3-minimal pointer" icon="document" text="Documents" />
        </Link>
        {/* Search, login, settings, dark mode */}
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
  )
}

export default TopBar