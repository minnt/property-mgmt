import React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core'

export default function BlockControls({ add, edit }) {
  return (
    <div>
      <ButtonGroup minimal={true}>
        {edit && <Button intent='primary' icon="edit">Edit</Button>}
        {add && <Button intent='success' icon="add">Add New</Button>}
      </ButtonGroup>
    </div>
  )
}
