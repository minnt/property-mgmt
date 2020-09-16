import React, { useState, useEffect, useContext } from 'react'
import { HTMLTable, EditableText, Button, Drawer, Position } from '@blueprintjs/core'
import axios from 'axios'

import { Context } from '../../Context'

const Info = ({ property, setProperty }) => {

  const [isDrawerOpen,  setIsDrawerOpen] = useState(false)
  const [sqftText,      setSqftText]     = useState('15,000')
  const [photos,        setPhotos]       = useState([])
  const [coverPhoto,    setCoverPhoto]   = useState('')

  const handleTextChange = (event) => setSqftText(event)

  const handleTextConfirm = (event) => {
    console.log(event)
    console.log('Editable text has been confirmed')
  }

  useEffect(() => {
    setCoverPhoto(property.coverPhoto)
  }, [property.coverPhoto])

  return (
    <>
      <div className="aside" style={{marginTop: '20px'}}>
        <div className="info-pane">

          <img src={coverPhoto} className="info-img pointer" alt="" onClick={() => {
            setIsDrawerOpen(true)
            axios.get('http://localhost:5000/photos/')
              .then(res => setPhotos(res.data))
              .catch(err => console.log(err))
          }}/>

          <div className="info-inner">

            <div className="flex-sb">
              <h1 className="heading">Info</h1>
              <i className="bp3-text-muted bp3-text-small" style={{ padding: '10px' }}>Click to edit</i>
            </div>

            <HTMLTable bordered={false}>
              <tbody>
                <tr>
                  <td><i className="fas fa-map-marker"></i></td>
                  <td>
                    <div className="address-grid">
                      <div style={{ gridArea: 'streetLabel' }}> Street:</div>
                      <div style={{ gridArea: 'streetForm' }}>  <EditableText multiline={false} value={property.street} minWidth={150} onConfirm={handleTextConfirm} /></div>
                      <div style={{ gridArea: 'cityLabel' }}>   City:</div>
                      <div style={{ gridArea: 'cityForm' }}>    <EditableText multiline={false} value={property.city} minWidth={100} onConfirm={handleTextConfirm} /></div>
                      <div style={{ gridArea: 'stateLabel' }}>  State:</div>
                      <div style={{ gridArea: 'stateForm' }}>   <EditableText multiline={false} value={property.state} minWidth={30} onConfirm={handleTextConfirm} /></div>
                      <div style={{ gridArea: 'zipLabel' }}>    Zip:</div>
                      <div style={{ gridArea: 'zipForm' }}>     <EditableText multiline={false} value={property.zip} minWidth={50} onConfirm={handleTextConfirm} /></div>
                    </div>
                    <div className="flex-sa mt10">
                      <a href="https://www.google.com/maps/place/Pullman+Square/">
                        <Button icon="map" minimal={true} small={true} text="View on map" intent="primary"/>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><i className="fas fa-square"></i></td>
                  <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <>
                      {property.units.length} units
                    </>
                    <>
                      <Button text="Add" icon="plus" intent="success" small={true} minimal={true} />
                    </>
                  </td>
                </tr>
                <tr>
                  <td><i className="fas fa-ruler"></i></td>
                  <td>Square footage: <EditableText multiline={false} value={sqftText} onChange={handleTextChange} maxLength={8} /></td>
                </tr>
                <tr>
                  <td><i className="fas fa-hand-holding-usd"></i></td>
                  <td>Renting for $500 to $1300 per month</td>
                </tr>
              </tbody>
            </HTMLTable>

          </div>
        </div>
      </div>

      <Photos photos={photos} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} property={property} setProperty={setProperty} setCoverPhoto={setCoverPhoto} />
    </>
  )
}

const Photos = ({ photos, isDrawerOpen, setIsDrawerOpen, property, setProperty, setCoverPhoto }) => {

  const {isDarkMode} = useContext(Context)

  const save = (photo) => {
    setCoverPhoto(`http://localhost:5000/photos/image/${photo.filename}`)
    var newProperty = {
      ...property,
      coverPhoto: `http://localhost:5000/photos/image/${photo.filename}`
      // updatedOn: timestamp
    }
    setProperty(newProperty)
    setIsDrawerOpen(false)
  }

  return (
    <Drawer
      className={isDarkMode ? 'bp3-dark' : ''}
      isOpen={isDrawerOpen}
      canEscapeKeyClose={true}
      canOutsideClickClose={true}
      position={Position.BOTTOM}
      size={Drawer.SIZE_STANDARD}
      title="Choose a new cover photo"
      onClose={() => {setIsDrawerOpen(false)}}
    >
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', padding: '50px', columnGap: '2em'}}>
        {
          photos.length > 0
            ? <>
              {
                photos.map(photo => {
                  return (
                    <div key={photo._id} className="mt50" style={{width: '100%'}}>
                      <img className="pic pointer" src={`http://localhost:5000/photos/image/${photo.filename}`} alt="" onClick={() => {save(photo)}}/>
                    </div>
                  )
                })
              }
          </>
          : <>
            No photos to show
          </>
        }
      </div>
    </Drawer>
  )
}

export default Info