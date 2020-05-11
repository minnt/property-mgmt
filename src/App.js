import React, {useEffect, useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import {Context} from './Context'

// Pages
import Property from './pages/Property'
import Unit from './pages/Unit'
import Tenant from './pages/Tenant'
import Welcome from './pages/Welcome'

// Components
import TreeNav from './components/TreeNav'
import Bar from './components/Bar'
import ViewAll from './components/ViewAll'

function App() {

  const {isDarkMode, toggleDarkMode} = useContext(Context)

  useEffect(() => {
    // Dark mode key event (Shift+D)
    document.addEventListener('keydown', function(e){
      if (e.shiftKey && e.key === 'D')
        toggleDarkMode()
    })
  }, [toggleDarkMode])

  return (
    <div className={isDarkMode ? 'container-inline bp3-dark' : 'container-inline'}>
      <div className={isDarkMode ? 'container darkmode' : 'container lightmode'}>

          <Bar />

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
            <Route path="/all">
              <ViewAll />
            </Route>
          </Switch>

      </div>
    </div>
  )
}

export default App