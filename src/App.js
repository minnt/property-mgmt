import React, { useEffect, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Context } from './Context'

// Pages
import Property from './pages/Property'
import Unit from './pages/Unit'
import Tenant from './pages/Tenant'
import Welcome from './pages/Welcome'
import ViewAll from './pages/ViewAll'
import Photos from './pages/Photos'
import About from './pages/About'

// Components
import TreeNav from './components/TreeNav'
import TopBar from './components/TopBar'

function App() {

  const {isDarkMode, toggleDarkMode} = useContext(Context)

  // Dark mode key event (Shift+D)
  useEffect(() => {
    document.addEventListener('keydown', function(e){
      if (e.shiftKey && e.key === 'D')
        toggleDarkMode()
    })
  }, [toggleDarkMode])

  return (
    <div className={isDarkMode ? 'bp3-dark fullpage-container darkmode' : 'fullpage-container lightmode'}>
      <TopBar />
      <TreeNav />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/property/:propertyId/unit/:unitNo">
          <Unit />
        </Route>
        <Route path="/property/:propertyId">
          <Property />
        </Route>
        <Route path="/tenant/:tenantNo">
          <Tenant />
        </Route>
        <Route path="/list/:filter">
          <ViewAll />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/photos">
          <Photos />
        </Route>
      </Switch>
    </div>
  )
}

export default App