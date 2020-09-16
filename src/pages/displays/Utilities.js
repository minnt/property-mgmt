import React, { useState, useContext } from 'react'
import { Card, Button, HTMLTable, Elevation, InputGroup } from '@blueprintjs/core'
import { motion } from 'framer-motion'

import { Context } from '../../Context'
import BlockControls from '../../components/BlockControls'

const Utilities = ({ property, setProperty }) => {

  const {displayVariants} = useContext(Context)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <motion.div variants={displayVariants} initial='hidden' animate='visible'>
      <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
        if (!isEditing)
          setIsEditing(prevState => !prevState)
      }}>
        <div className="flex-sb">
          <h1 className="heading">Utilities</h1>
          <BlockControls add={false} edit={true} />
        </div>
        {
          isEditing
          ? <>
            <Edit property={property} setProperty={setProperty} setIsEditing={setIsEditing}/>
          </>
          : <>
            <Display property={property} />
          </>
        }
      </Card>
    </motion.div>
  )
}

const Edit = ({ property, setProperty, setIsEditing }) => {

  const [inputs, setInputs] = useState({...property.utilities})

  const handleChange = (event) => {
    const {name, value} = event.target
    setInputs(prevInputs => ({...prevInputs, [name]: value}))
  }

  const save = () => {
    var newUtilities = {
      power:    inputs.power,
      gas:      inputs.gas,
      water:    inputs.water,
      sewage:   inputs.sewage,
      waste:    inputs.waste,
      internet: inputs.internet,
      lawncare: inputs.lawncare
    }

    var myDate = new Date()
    var timestamp = myDate.getTime()

    var tempProperty = {
      ...property,
      utilities: {...newUtilities},
      updatedOn: timestamp
    }
    setProperty(tempProperty)
    setIsEditing(prevState => !prevState)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '30px' }}>
          <i className="fas fa-plug" style={{ color: 'rgb(247, 194, 47)', paddingRight: '10px'}}></i>
        </div>
        <InputGroup value={inputs.power} fill={true} name="power" onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '30px' }}>
          <i className="fas fa-fire" style={{ color: 'rgb(247, 127, 47)', paddingRight: '10px'}}></i>
        </div>
        <InputGroup value={inputs.gas} fill={true} name="gas" onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '30px' }}>
          <i className="fas fa-faucet" style={{ color: 'rgb(47, 167, 247)', paddingRight: '10px'}}></i>
        </div>
        <InputGroup value={inputs.water} fill={true} name="water" onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '30px' }}>
          <i className="fas fa-toilet" style={{ color: '#BFCCD6', paddingRight: '10px'}}></i>
        </div>
        <InputGroup value={inputs.sewage} fill={true} name="sewage" onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '30px' }}>
          <i className="fas fa-trash-alt" style={{ color: '#8A9BA8', paddingRight: '10px'}}></i>
        </div>
        <InputGroup value={inputs.waste} fill={true} name="waste" onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '30px' }}>
          <i className="fas fa-wifi" style={{ color: '#00B3A4', paddingRight: '10px'}}></i>
        </div>
        <InputGroup value={inputs.internet} fill={true} name="internet" onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '30px' }}>
          <i className="fas fa-leaf" style={{ color: 'rgb(117, 247, 47)', paddingRight: '10px'}}></i>
        </div>
        <InputGroup value={inputs.lawncare} fill={true} name="lawncare" onChange={handleChange} />
      </div>

      <div className="flex-sb" style={{ marginTop: '20px' }}>
        <Button className="mt10" intent="success" icon="floppy-disk" text="Save" onClick={() => save()}/>
        <Button className="mt10" intent="danger" icon="cross" text="Cancel" onClick={() => {setIsEditing(prevState => !prevState)}} />
      </div>
    </>
  )
}

const Display = ({ property }) => {
  return (
    <HTMLTable className="width100" bordered={false} striped={false} condensed={true}>
      <thead>
        <tr>
          <th>Type</th>
          <th></th>
          <th>Provider</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Power</td>
          <td><i className="fas fa-plug"      style={{ color: 'rgb(247, 194, 47)' }}></i></td>
          <td><i>{property.utilities.power}</i></td>
        </tr>
        <tr>
          <td>Gas</td>
          <td><i className="fas fa-fire"      style={{ color: 'rgb(247, 127, 47)' }}></i></td>
          <td><i>{property.utilities.gas}</i></td>
        </tr>
        <tr>
          <td>Water</td>
          <td><i className="fas fa-faucet"    style={{ color: 'rgb(47, 167, 247)' }}></i></td>
          <td><i>{property.utilities.water}</i></td>
        </tr>
        <tr>
          <td>Sewage</td>
          <td><i className="fas fa-toilet"    style={{ color: '#BFCCD6' }}></i></td>
          <td><i>{property.utilities.sewage}</i></td>
        </tr>
        <tr>
          <td>Waste</td>
          <td><i className="fas fa-trash-alt" style={{ color: '#8A9BA8' }}></i></td>
          <td><i>{property.utilities.waste}</i></td>
        </tr>
        <tr>
          <td>Internet</td>
          <td><i className="fas fa-wifi"      style={{ color: '#00B3A4' }}></i></td>
          <td><i>{property.utilities.internet}</i></td>
        </tr>
        <tr>
          <td>Lawncare</td>
          <td><i className="fas fa-leaf"      style={{ color: 'rgb(117, 247, 47)' }}></i></td>
          <td><i>{property.utilities.lawncare}</i></td>
        </tr>
      </tbody>
    </HTMLTable>
  )
}

export default Utilities