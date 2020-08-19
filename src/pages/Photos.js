import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {Dialog, Classes} from "@blueprintjs/core"

import {Context} from '../Context'

function Photos() {

  const {isDarkMode}                     = useContext(Context)

  const [photos, setPhotos]               = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState('http://localhost:5000/photos/image/224be0607c922e57c58d927d37fda409.png')
  const [isDialogOpen,  setIsDialogOpen]  = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  const types = ['image/png', 'image/jpeg']
  
  // const [filename, setFilename] = useState('Choose file...')

  useEffect(() => {
    axios.get('http://localhost:5000/photos/')
      .then(res => setPhotos(res.data))
      .catch(err => console.log(err))
  }, [])

  // function handleChange(e) {
  //   setFilename(e.target.value)
  // }

  // Reload file data
  // function reload() {
  //   axios.get('http://localhost:5000/photos/')
  //     .then(res => setPhotos(res.data))
  //     .catch(err => console.log(err))
  // }

  const handleChange = (e) => {
    let selected = e.target.files[0]
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

      <hr />

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

      <h4 className="mt20">View / Delete: </h4>
      <div className="photos-grid">
        {
          photos.length > 0 ?
            <>
              {/* <p>There are {photos.length} photo(s)</p> */}
              {
                photos.map(photo => {
                  return (
                    <div key={photo._id} className="mt50">
                      <img className="pic pointer" src={`http://localhost:5000/photos/image/${photo.filename}`} alt="" onClick={() => {
                        setIsDialogOpen(true)
                        setSelectedPhoto(`http://localhost:5000/photos/image/${photo.filename}`)
                      }}/>
                      <form method="POST" action={`http://localhost:5000/photos/files/${photo._id}?_method=DELETE`}>
                        <button className="bp3-button bp3-intent-danger bp3-fill bp3-outlined mt10">
                          Delete
                        </button>
                      </form>
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