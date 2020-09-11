import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Dialog, Classes } from "@blueprintjs/core"
import { motion } from 'framer-motion'

import { Context } from '../Context'

function Photos() {

  const {isDarkMode}                     = useContext(Context)

  const [photos, setPhotos]               = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState('')
  const [isDialogOpen,  setIsDialogOpen]  = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const types = ['image/png', 'image/jpeg']

  useEffect(() => {
    axios.get('http://localhost:5000/photos/')
      .then(res => setPhotos(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleChange = (event) => {
    let selected = event.target.files[0]
    console.log(selected)

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError('')
    } else {
      setFile(null)
      setError('Please select an image file (PNG or JPEG)')
    }
  }

  return (
    <div className="content">

      <div className="flex-sb ac">
        <h1 className="title noselect">
          Photos
        </h1>
      </div>

      <hr className="divider" />

      <h4>Upload:</h4>
      <div style={{width: '300px'}}>
        <form action="http://localhost:5000/photos/upload" method="POST" encType="multipart/form-data">
          <label className="bp3-file-input bp3-fill">
            <input type="file" name="file" id="file" onChange={handleChange}/>
            <span className="bp3-file-upload-input">{ file ? `${file.name}` : 'Choose file...' }</span>
          </label>
          <button className="bp3-button bp3-intent-success bp3-fill bp3-outlined mt10" type="submit">
            Submit
          </button>
        </form>
      </div>

      <p style={{ color: '#DB3737' }}>{error}</p>

      <h4 className="mt20">View / Delete: </h4>
      <div className="photos-grid" style={{ padding: '20px' }}>
        {
          photos.length > 0 ?
            <>
              {/* <p>There are {photos.length} photo(s)</p> */}
              {
                photos.map(photo => {
                  return (
                    <div key={photo._id} className="mt50">
                      <motion.img 
                        className="pic pointer"
                        style={{ borderRadius: '3px' }}
                        src={`http://localhost:5000/photos/image/${photo.filename}`} 
                        alt=""
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          setIsDialogOpen(true)
                          setSelectedPhoto(`http://localhost:5000/photos/image/${photo.filename}`)
                      }}/>
                      <form method="POST" action={`http://localhost:5000/photos/files/${photo._id}?_method=DELETE`}>
                        <button className="bp3-button bp3-intent-danger bp3-fill bp3-outlined mt10">
                          Delete
                        </button>
                      </form>
                      {/* <Button icon="more" text="Actions"></Button> */}
                    </div>
                  )
                })
              }
            </>
          :
            <>
              No photos to show
            </>
        }
      </div>
      <Dialog
        className={isDarkMode ? 'bp3-dark' : ''}
        isOpen={isDialogOpen}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        title="Photo Viewer"
        onClose={() => {setIsDialogOpen(false)}}
      >
        <div className={Classes.DIALOG_BODY}>
          <img className="pic" src={selectedPhoto} alt="" />
        </div>
      </Dialog>
    </div>
  )
}

export default Photos