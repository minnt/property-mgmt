import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import {HTMLTable, InputGroup, Button, Tag, Tab, Tabs, 
  NumericInput, FileInput, Dialog, Icon, Alert, Intent, Callout, HTMLSelect, Spinner} from "@blueprintjs/core"
import {AppToaster} from "../utils/toaster"

import {Context} from '../Context'

// Component to render a list of properties
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
  const [inputData,       setInputData]       = useState({
    propertyName: "", 
    propertyNoOfUnits: 0, 
    propertyStreet: "",
    propertyCity: "", 
    propertyState: "", 
    propertyZip: "",
    propertyType: ""
  })

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

  // Reload property data
  function reload() {
    setIsLoading(true)
    axios.get('http://localhost:5000/residential/')
      .then(res => {
        setProperties(res.data)
        setDispProperties(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  function handleChange(event) {
    const {name, value} = event.target
    setInputData(prevInputData => ({...prevInputData, [name]: value}))
  }

  function handleTabChange(event) {
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

  function handleSelectChange(event) {
    let value = event.currentTarget.value
    setInputData(prevInputData => ({...prevInputData, propertyType: value}))
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

      <hr />

      {/* Dialog to add a new property and the accompanying info */}
      <Dialog 
        isOpen={isDialogOpen}
        className={isDarkMode ? 'bp3-dark' : ''}
        canEscapeKeyClose={true} 
        canOutsideClickClose={true}
        isCloseButtonShown={true} 
        title="Add a new property" 
        onClose={() => {setIsDialogOpen(false)}}
        icon="plus"
      >
        <div className="dialog mt20">
          <InputGroup type="text" value={inputData.propertyName} name="propertyName" placeholder="Name of property" onChange={handleChange}/>
          <div className="flex-sb">
            Number of units: <NumericInput disabled={true} name="propertyNoOfUnits"/>
          </div>
          <InputGroup type="text" value={inputData.propertyStreet} name="propertyStreet" placeholder="Street Address" onChange={handleChange}/>
          <div className="flex-sb">
            <InputGroup type="text" placeholder="City"      name="propertyCity"   value={inputData.propertyCity}  onChange={handleChange} style={{flex: 2}}/>
            <InputGroup type="text" placeholder="State"     name="propertyState"  value={inputData.propertyState} onChange={handleChange} style={{flex: 1}}/>
            <InputGroup type="text" placeholder="ZIP Code"  name="propertyZip"    value={inputData.propertyZip}   onChange={handleChange} style={{flex: 1}}/>
          </div>
          <FileInput disabled={true} text="Upload images..." />
          <HTMLSelect onChange={handleSelectChange} disabled={true}>
            <option>Residential</option>
            <option>Commercial</option>
          </HTMLSelect>
          <Callout icon="info-sign">More detailed information can be entered on the overview page for this property, after creation.</Callout>
          <div className="width50">
            <Button icon="floppy-disk" text="Save" onClick={() => {
              var newProperty = {
                name:   inputData.propertyName,
                street: inputData.propertyStreet,
                city:   inputData.propertyCity,
                state:  inputData.propertyState,
                zip:    inputData.propertyZip,
                // type:   inputData.propertyType
              }
              axios.post('http://localhost:5000/residential/add', newProperty)
                .then(res => {
                  // setDispProperties(prevDispProperties => ({...prevDispProperties, newProperty}))
                  setIsDialogOpen(false)
                  showToast("Property added", "success")
                  reload()
                })
                .catch(err => console.log(err))
            }}/>
          </div>
        </div>
      </Dialog>

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
        isLoading ?
          <div className="spinner">
            <Spinner size={Spinner.SIZE_LARGE} />
          </div>
        :
      <div className="flex-sb">

        <div className="flex-col-sb" style={{height: '200px', marginRight: '20px'}}>
          <Tabs animate={true} id="navbar" vertical={true} large={false} onChange={handleTabChange} selectedTabId={selectedTab}>
            <Tab id="all" title="All" />
            <Tab id="com" title="Commercial" />
            <Tab id="res" title="Residential" />
          </Tabs>
          <Button intent="success" icon="plus" onClick={() => setIsDialogOpen(true)}>Add</Button>
        </div>

        {
          dispProperties.length > 0 ?
            <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
              <thead>
                <tr>
                  <th>Name<Icon icon="caret-up" /></th>
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
          :
            <div style={{width: '100%'}}>
              <Callout title="No properties" style={{width: '500px', margin: 'auto'}}>New properties can be registered using the [Add] button.</Callout>
            </div>
        }

      </div>}

    </div>
  )
}

export default ViewAll