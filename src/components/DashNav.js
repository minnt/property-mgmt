import React from 'react'
import {Link} from 'react-router-dom'

function DashNav() {
  return (
    <div className="dashboard-nav">
      <div className="branding-title">
        ExoCortex<br />by<br />ATLAS
      </div>

      <Link to="/">      
        <div className="nav-item">
          Expense Tracker
        </div>
      </Link>
      <Link to="/notes">      
        <div className="nav-item">
          Notes
        </div>
      </Link>
      <div className="nav-item">
        Diet
      </div>
      <div className="nav-item">
        Exercise
      </div>
      <div className="nav-item">
        Calendar
      </div>
      <div className="nav-item">
        Tasks
      </div>
      <Link to="/noots">
        <div className="nav-item">
          Nootropics
        </div>
      </Link>
      <Link to="/testing">
        <div className="nav-item">
          Testing
        </div>
      </Link>
      <Link to="/property">
        <div className="nav-item">
          Properties
        </div>
      </Link>
      <div className="nav-item">
        [Search]
      </div>
      <div className="nav-item">
        [Settings]
      </div>
      <div className="nav-item">
        [Dark Mode]
      </div>
    </div>
  )
}

export default DashNav