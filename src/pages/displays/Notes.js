import React, { useState, useContext } from 'react'
import { Card, Button, HTMLTable, Elevation, InputGroup, Tooltip, Position, Icon } from '@blueprintjs/core'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

import { Context } from '../../Context'
import BlockControls from '../../components/BlockControls'


const Notes = ({ property, setProperty }) => {

  const {displayVariants} = useContext(Context)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <motion.div variants={displayVariants} initial='hidden' animate='visible'>
      <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
        if (!isEditing)
          setIsEditing(prevState => !prevState)
      }}>
        <div className="flex-sb">
          <h1 className="heading">Notes</h1>
          <BlockControls add={true} edit={true} />
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

  const [inputs,  setInputs]  = useState([...property.notes])
  const [newText, setNewText] = useState('')

  console.log(inputs)

  const handleChangeExisting = (event, index) => {
    const value = event.target.value
    let newPropertyNotes = [...inputs]
    newPropertyNotes[index].info = value
    setInputs(newPropertyNotes)
  }

  const save = () => {
    var myDate = new Date()
    var timestamp = myDate.getTime()
    var newProperty = {
      ...property,
      notes: [...inputs],
      updatedOn: timestamp
    }
    setProperty(newProperty)
    setIsEditing(false)
  }

  const add = () => {
    let uuid = uuidv4()
    let newNote = {id: uuid, info: newText}
    let newInputs = [...inputs, newNote]
    setInputs(newInputs)
  }

  const remove = (noteIndex) => {
    const result = inputs.filter(note => note.id !== noteIndex.id)
    setInputs(result)
  }

  return (                
    <>
      <p className="mt20">Edit:</p>

      {/* List of notes to be edited */}
      {
        inputs.map((note, index) => {
          return (
            <div key={note.id} className="flex-sb ac mt10">
              <div style={{ marginRight: '25px', width: '100%' }}>
                <InputGroup key={note.id} className="" small={true} fill={true} value={note.info} onChange={(e) => {handleChangeExisting(e, index)}}/>
              </div>
              <Tooltip content="Delete" position={Position.TOP}>
                <Icon icon='delete' intent='danger' onClick={() => remove(note)} />
              </Tooltip>
            </div>
          )
        })
      }

      <p className="mt20">New:</p>

      {/* New note field and add button */}
      <div className="flex-sb mt10" style={{ alignItems: 'center' }}>
        <div style={{ marginRight: '25px', width: '100%' }}>
          <InputGroup className="mt10" fill={true} placeholder="New note" value={newText} onChange={(e) => setNewText(e.target.value)} />
        </div>

        <Tooltip content="Add" position={Position.TOP}>
          <Icon icon='add' intent='primary' onClick={() => add()} />
        </Tooltip>
      </div>

      {/* Save and cancel buttons */}
      <div className="flex-sb">
        <Button className="mt10" intent="success" icon="floppy-disk" text="Save" onClick={() => {save()}}/>
        <Button className="mt10" intent="danger" icon="cross" text="Cancel" onClick={() => {setIsEditing(prevState => !prevState)}} />
      </div>
    </>
  )
}

const Display = ({ property }) => {
  return (
    <>
      {
        property.notes.length > 0
          ? <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
            <tbody>
              {
                property.notes.map(note => {
                  return (
                    <tr key={note.id}>
                      <td>{note.info}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </HTMLTable>
        : <>No notes</>
      }
    </>
  )
}

export default Notes