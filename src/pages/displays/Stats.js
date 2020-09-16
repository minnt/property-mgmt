import React, { useContext } from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import { motion } from 'framer-motion'

import { Context } from '../../Context'
import LineChart from '../../components/LineChart'

const Stats = () => {

  const {displayVariants} = useContext(Context)

  return (
    <motion.div variants={displayVariants} initial='hidden' animate='visible'>
      <Card interactive={false} elevation={Elevation.ZERO} className="mt20">
        <h1 className="heading">Stats</h1>
        <LineChart />
      </Card>
    </motion.div>
  )
}

export default Stats