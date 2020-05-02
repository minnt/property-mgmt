import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import {Icon, Tooltip} from "@blueprintjs/core"

import {Context} from '../Context'


function Bar() {

  const {isDarkMode, toggleDarkMode} = useContext(Context)

  return (
    <div className="bar">

      <Link to="/">
        <Icon className="pointer" icon="home" />
      </Link>
      
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
      
    </div>
  )
}

export default Bar