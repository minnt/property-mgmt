import React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core'
import { motion } from 'framer-motion'

export default function BlockControls({ add, edit }) {
  return (
    <motion.div initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}}>
      <ButtonGroup minimal={true}>
        {edit && <Button intent='primary' icon="edit">Edit</Button>}
        {add && <Button intent='success' icon="add">Add New</Button>}
      </ButtonGroup>
    </motion.div>
  )
}