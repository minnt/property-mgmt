import React from 'react'
import { Button, Tab, Tabs } from "@blueprintjs/core"

const VertTabs = ({ setIsDialogOpen, selectedTab, setSelectedTab }) => {

  // Tabs can be changed by clicking the button or by using the router via the tree nav
  const handleTabChange = (event) => {
    switch (event) {
      case 'all':
        setSelectedTab('all')
        break
      case 'res':
        setSelectedTab('res')
        break
      case 'com':
        setSelectedTab('com')
        break
      default:
        console.log('No tab selected')
    }
  }

  return (
    <div className="flex-col-sb" style={{ height: '200px', marginRight: '20px' }}>
      <Tabs animate={true} id="navbar" vertical={true} large={false} onChange={handleTabChange} selectedTabId={selectedTab}>
        <Tab id="all" title="All" />
        <Tab id="com" title="Commercial" />
        <Tab id="res" title="Residential" />
      </Tabs>
      <Button intent="success" icon="plus" onClick={() => setIsDialogOpen(true)}>Add</Button>
    </div>
  )
}

export default VertTabs
