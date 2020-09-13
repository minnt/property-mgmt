import React from 'react'
import { Card, Button, Elevation } from '@blueprintjs/core'
import { get, set } from 'lodash'

import BlockControls from './BlockControls'

const Display = ({ editingFlag, setIsEditing, editingProp, property, setProperty, parseDate, inputData, displayRender, editRender, mapping, title }) => {

  const save = () => {
    setIsEditing(prevInputData => ({...prevInputData, [editingProp]: false}))

    var myDate = new Date()
    var timestamp = myDate.getTime()

    var newProperty = {...property}
    mapping.forEach(element => {
      var value = get(inputData, element.in) // Get the value from the inputData object
      set(newProperty, element.out, value) // Set the above value to the appropriate object in newProperty
    })

    newProperty = {
      ...newProperty,
      updatedOn: timestamp
    }

    parseDate(timestamp)
    console.log(newProperty)
    setProperty(newProperty)
  }

  return (
    <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
      if (!editingFlag)
        setIsEditing(prevState => ({...prevState, [editingProp]: true}))
    }}>
      <div className="flex-sb">
        <h1 className="heading">{title}</h1>
        {/* Need a way to check for one vs two buttons */}
        <BlockControls add={false} edit={true} />
      </div>
      {
        editingFlag
        ? <>
          {editRender}
          <div className="flex-sb">
            <Button className="mt10" intent="success" icon="floppy-disk"  text="Save"   onClick={() => {save()}}/>
            <Button className="mt10" intent="danger"  icon="cross"        text="Cancel" onClick={() => {setIsEditing(prevInputData => ({...prevInputData, [editingProp]: false}))}} />
          </div>
        </>
        : <>
          {displayRender}
        </>
      }

    </Card>
  )
}

export default Display