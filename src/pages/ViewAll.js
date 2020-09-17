import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { HTMLTable, Button, Tag, Alert, Intent, Callout, Spinner } from "@blueprintjs/core"
import { AppToaster } from '../utils/toaster'

import { Context } from '../Context'

import AddDialog from '../components/list/AddDialog'
import Tabs from '../components/list/VertTabs'

function ViewAll() {

  let   {filter}                              = useParams()

  const {isDarkMode}                          = useContext(Context)

  const [properties,      setProperties]      = useState([])
  const [dispProperties,  setDispProperties]  = useState('')
  const [activeProperty,  setActiveProperty]  = useState({})
  const [selectedTab,     setSelectedTab]     = useState(0)

  const [isDialogOpen,    setIsDialogOpen]    = useState(false)
  const [isAlertOpen,     setIsAlertOpen]     = useState(false)
  const [isLoading,       setIsLoading]       = useState(true)


  // Load properties data from DB
  useEffect(() => {
    function fetchData() {
      axios.get(`http://localhost:5000/residential/`)
        .then(res => {
          setProperties(res.data)
          setDispProperties(res.data)
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
    fetchData()

    switch (filter) {
      case '':
        setSelectedTab('all')
        break
      case 'residential':
        setSelectedTab('res')
        break
      case 'commercial':
        setSelectedTab('com')
        break
      default:
        setSelectedTab('all')
        break
    }
  }, [filter])

  // Update the display when the selected tab changes
  useEffect(() => {
    switch (selectedTab) {
      case 'all':
        setDispProperties(properties)
        break
      case 'res':
        setDispProperties(properties.filter(property => property.type === 'Residential'))
        break
      case 'com':
        setDispProperties(properties.filter(property => property.type === 'Commercial'))
        break
      default:
        console.log('No tab selected')
    }
  }, [selectedTab, properties])

  const reload = () => {
    setIsLoading(true)
    axios.get('http://localhost:5000/residential/')
      .then(res => {
        setProperties(res.data)
        setDispProperties(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const showToast = (msg, int) => {
    AppToaster.show({message: msg, intent: int})
  }

  const handleDeleteCancel = () => setIsAlertOpen(false)

  const handleDeleteConfirm = () => {
    let property = activeProperty
    axios.delete(`http://localhost:5000/residential/${property._id}`)
      .then(res => {
        showToast("Property deleted", "danger")
        setDispProperties(dispProperties.filter(remaining => remaining._id !== property._id))
        setIsAlertOpen(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="content">

      <h1 className="title noselect">
        All Properties
      </h1>

      <hr className="divider" />

      <AddDialog setIsDialogOpen={setIsDialogOpen} isDialogOpen={isDialogOpen} showToast={showToast} reload={reload} isDarkMode={isDarkMode} />

      {/* Alert to confirm the deletion of a property */}
      <Alert
        className={isDarkMode ? 'bp3-dark' : ''}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        canEscapeKeyCancel={true}
        canOutsideClickCancel={true}
        icon="trash"
        intent={Intent.DANGER}
        isOpen={isAlertOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      >
        <p>
          Are you sure you want to delete the property <b>{activeProperty.name}</b>? You will <b>not</b> be able to restore it later.
        </p>
      </Alert>

      {
        isLoading
          ? <div className="spinner">
            <Spinner size={Spinner.SIZE_LARGE} />
          </div>

          : <div className="flex-sb">

            <Tabs setIsDialogOpen={setIsDialogOpen} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {
                dispProperties.length > 0
                  ? <HTMLTable bordered={true} striped={true} condensed={true} style={{ width: '60%' }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th># of Units</th>
                        <th>City</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dispProperties.map(property => {
                          return (
                            <tr key={property._id}>
                              <td><Link to={`/property/${property._id}`}>{property.name}</Link></td>
                              <td><Tag intent={property.type === "Residential" ? 'primary' : ''}>{property.type}</Tag></td>
                              <td>{property.units.length}</td>
                              <td>{property.city}</td>
                              <td>
                                <Button intent="danger" icon="trash" minimal={true} small={true} onClick={() => {
                                  setActiveProperty(property)
                                  setIsAlertOpen(true)
                                }}>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </HTMLTable>

                  : <div style={{ width: '100%' }}>
                    <Callout title="No properties" style={{width: '500px', margin: 'auto'}}>New properties can be registered using the [Add] button.</Callout>
                  </div>
              }
            </div>
          </div>
      }
    </div>
  )
}

export default ViewAll