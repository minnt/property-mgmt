import React, { useState, useEffect, useContext } from 'react'
import { Card, Button, HTMLTable, Elevation, InputGroup, Tooltip, Position, Popover, Intent } from '@blueprintjs/core'
import { DatePicker, Classes } from '@blueprintjs/datetime'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

import { Context } from '../../Context'
import { months } from '../../utils/monthsDays'
import BlockControls from '../../components/BlockControls'

const Events = ({ property, setProperty }) => {

  const {displayVariants} = useContext(Context)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <motion.div variants={displayVariants} initial='hidden' animate='visible'>
      <Card interactive={true} elevation={Elevation.ZERO} className="mt20" onClick={() => {
        if (!isEditing)
          setIsEditing(prevState => !prevState)
      }}>
        <div className="flex-sb">
          <h1 className="heading">Events</h1>
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

// Edit or add new events
const Edit = ({ property, setProperty, setIsEditing }) => {

  const [selectedDate,  setSelectedDate]  = useState('Select Date') // New event date state
  const [inputs,        setInputs]        = useState([]) // Array of objects
  const [newInfo,       setNewInfo]       = useState('')

  useEffect(() => {
    console.log(property.events)
    setInputs([...property.events])
  }, [property])

  const handleDateChange = (event) => {
    if (event !== null) {
      var date  = event.getDate()
      var month = event.getMonth()
      var year  = event.getFullYear()
      setSelectedDate(`${months[month]} ${date} ${year}`)
    } else {
      console.log("Null date")
    }
  }

  const handleChangeInfo = (event, index) => {
    const value = event.target.value
    let tempEvents = [...inputs]
    tempEvents[index].info = value
    setInputs(tempEvents)
  }

  const add = () => {
    let uuid = uuidv4()
    let newEvent = {date: selectedDate, info: newInfo, id: uuid}
    let tempEvents = [...inputs]
    tempEvents.push(newEvent)  // Necessary?  do this instead: tempEvents = [...inputs, newEvent]
    setInputs(prevInputs => ({ // WTF
      ...prevInputs,
      tempEvents
    }))
    setSelectedDate('Select Date')
    setNewInfo('')
  }

  const remove = (eventIndex) => {
    const result = inputs.filter(event => event.id !== eventIndex.id)
    // setInputs(prevInputs => ({
    //   ...prevInputs,
    //   ...result
    // }))
    setInputs(result)
  }

  const save = () => {
    var myDate = new Date()
    var timestamp = myDate.getTime()
    var tempProperty = {
      ...property,
      events: [...inputs],
      updatedOn: timestamp
    }
    setProperty(tempProperty)
    setIsEditing(false)
  }

  return (
    <>
      {/* Header */}
      <div className="flex-sb" style={{ alignItems: 'center' }}>
        <p>Edit</p>
        <hr className="divider" style={{ width: '90%' }}/>
      </div>

      {/* List of existing events to be modified */}
      {
        inputs.map((event, index) => {
          return (
            <div key={event.id} className="flex-sb mt10" style={{ alignItems: 'center' }}>
              {/* Date */}
              <div style={{ marginRight: '5px', width: '240px' }}>
                <Popover autoFocus={false}>
                  <Button intent={Intent.PRIMARY} outlined='true' text={event.date} icon="timeline-events" small={true} />
                  <DatePicker className={Classes.ELEVATION_1} highlightCurrentDay={true} onChange={handleDateChange} />
                </Popover>
              </div>
              {/* Info */}
              <InputGroup small={true} fill={true} value={event.info} onChange={(e) => handleChangeInfo(e, index)} />
              {/* Delete button */}
              <div style={{ marginLeft: '15px' }}>
                <Tooltip content="Delete" position={Position.TOP}>
                  <Button icon='delete' intent='danger' minimal={true} onClick={() => remove(event)}/>
                </Tooltip>
              </div>
            </div>
          )
        })
      }

      {/* Input fields for adding a new event */}
      <div className="flex-sb mt20" style={{ alignItems: 'center' }}>
        <p>New</p>
        <hr className="divider" style={{ width: '90%' }} />
      </div>
      <div className="flex-sb mt10">

        {/* New Date */}
        <div style={{ marginRight: '5px', width: '240px' }}>
          <Popover autoFocus={false}>
            <Button intent={Intent.PRIMARY} outlined='true' text={selectedDate} icon="timeline-events" />
            <DatePicker className={Classes.ELEVATION_1} highlightCurrentDay={true} onChange={handleDateChange} />
          </Popover>
        </div>

        {/* New Info */}
        <InputGroup 
          style={{ flex: 'auto'}}
          fill={true}
          value={newInfo}
          placeholder="New event info"
          onChange={handleChangeInfo}
        />
        {/* Add button */}
        <div style={{ marginLeft: '15px' }}>
          <Tooltip content="Add" position={Position.TOP}>
            <Button icon='add' intent='primary' minimal={true} onClick={() => add()}/>
          </Tooltip>
        </div>

      </div>
      {/* Save and cancel buttons */}
      <div className="flex-sb">
        <Button className="mt10" intent="success" icon="floppy-disk"  text="Save"   onClick={() => save()}/>
        <Button className="mt10" intent="danger"  icon="cross"        text="Cancel" onClick={() => setIsEditing(prevState => !prevState)} />
      </div>
    </>
  )
}

// Render a table of events
const Display = ({property}) => {
  return (
    <>
      {
        property.events.length > 0 ?
          <HTMLTable className="width100" bordered={true} striped={true} condensed={true}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Event Info</th>
              </tr>
            </thead>
            <tbody>
              {
                property.events.map(event => {
                  return (
                    <tr key={event.id}>
                      <td>{event.date}</td>
                      <td>{event.info}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </HTMLTable>
        :
          <>No events</>
      }
    </>
  )
}

export default Events