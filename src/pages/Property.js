import React, { useState, useRef, useLayoutEffect, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Spinner } from '@blueprintjs/core'
import axios from 'axios'
import { motion } from 'framer-motion'

import { Context } from '../Context'
import { AppToaster } from '../utils/toaster'
import { months, days } from '../utils/monthsDays'

// Display
import Info       from './displays/Info'
import Events     from './displays/Events'
import Utilities  from './displays/Utilities'
import Notes      from './displays/Notes'
import Stats      from './displays/Stats'

// Utils
import ParseDate from '../utils/parseDate'

function Property() {

  let   {propertyId}         = useParams()
  const {quickPopInVariants, containerVariants, displayVariants} = useContext(Context)

  const [isLoading,     setIsLoading]    = useState(true)
  const [isFavorite,    setIsFavorite]   = useState(false)
  
  const [property,      setProperty]     = useState({})
  const [lastUpdate,    setLastUpdate]   = useState('')

  // Load property data from DB
  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:5000/residential/${propertyId}`)
        .then(res => {
          console.log('Loading properties data')
          setProperty(res.data)

          var {month, date, day, hours, minutes, year} = ParseDate(res.data.updatedOn)
          setLastUpdate(`${hours}:${minutes} ${days[day]} ${months[month]} ${date} ${year}`)

          setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [propertyId])

  // If the local property data has changed then update the DB, do not fire on first render
  const firstUpdate = useRef(true)
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    axios.post(`http://localhost:5000/residential/update/${property._id}`, property) // Does this need fixed?
      .then(res => console.log(res.data))
    console.log('New property data submitted to DB')
    showToast('Changes saved', 'success')
  }, [property])

  // const addZero = (i) => {
  //   if (i < 10)
  //     i = "0" + i
  //   return i
  // }

  // const parseDate = (inputDate) => {
  //   var myDate = new Date(inputDate)
  //   var month = myDate.getMonth()
  //   var date = myDate.getDate()
  //   var day = myDate.getDay()
  //   var hours = myDate.getHours()
  //   var minutes = addZero(myDate.getMinutes())
  //   var year = myDate.getFullYear()

  //   setLastUpdate(`${hours}:${minutes} ${days[day]} ${months[month]} ${date} ${year}`)
  // }

  const showToast = (msg, int) => {
    AppToaster.show({message: msg, intent: int})
  }

  return (
    <div className="content">
      {
        isLoading 
        ? <div className="spinner">
          <Spinner size={Spinner.SIZE_LARGE} />
        </div>
        : <>
            <div className="flex-sb ac">
              <h1 className="title noselect">
                {property.name}
              </h1>
              <h5><i>Last edited: {lastUpdate}</i></h5>
              <div style={{ padding: '15px 0', width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button minimal={true} intent='warning' onClick={() => {setIsFavorite(prevState => !prevState)}}>
                  {
                    isFavorite
                      ? <>
                        <motion.i variants={quickPopInVariants} initial='hidden' animate='visible' className="fas fa-star" style={{ marginRight: '5px' }}/>
                        Favorited
                      </>
                      : <>
                        <i className="far fa-star" style={{ marginRight: '5px' }}/>
                        Mark as Favorite
                      </>
                  }
                </Button>
              </div>
            </div>

            <hr className="divider" />

            <div className="content-inner">
              <motion.div className="main" variants={containerVariants} initial='hidden' animate='visible'>
                <Utilities  property={property} setProperty={setProperty} />
                <Events     property={property} setProperty={setProperty} />
                <Notes      property={property} setProperty={setProperty} />
                <Stats />
              </motion.div>

              <motion.div variants={containerVariants} initial='hidden' animate='visible'>
                <motion.div variants={displayVariants} initial='hidden' animate='visible'/>
              </motion.div>

              <Info property={property} setProperty={setProperty} />
            </div>
        </>
      }
    </div>
  )
}

export default Property