import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Button, FileInput} from "@blueprintjs/core"

function Photos() {

  const [photos, setPhotos] = useState([])
  const [filename, setFilename] = useState('Choose file...')

  useEffect(() => {
    axios.get('http://localhost:5000/photos/')
      .then(res => setPhotos(res.data))
      .catch(err => console.log(err))
  }, [])

  function handleChange(e) {
    setFilename(e.target.value)
  }

  return (
    <div className="content">

      <div className="flex-sb ac">
        <h1 className="title noselect">
          Photos
        </h1>
      </div>

      <hr />

      <div className="photos-inner">

          <h4>Upload:</h4>
          <FileInput className="file-input" disabled={false} text={filename} onInputChange={handleChange} />
          <Button className="file-input mt10" intent="success" type="submit" icon="key-enter">Submit</Button>

          {/* <form action="http://localhost:5000/photos/upload" method="POST" encType="multipart/form-data">
            <div>
              <input className="mt10" type="file" name="file" id="file" />
            </div>
            <input className="mt10" type="submit" value="Submit" />
          </form> */}

          <h4 className="mt20">View / Delete: </h4>
          <div className="photos-grid">
            {
              photos.length > 0 ?
                <>
                  {/* <p>There are {photos.length} photo(s)</p> */}
                  {
                    photos.map(photo => {
                      // var isLoading = true
                      // axios.get(`http://localhost:5000/photos/image/${photo.filename}`)
                      //   .then(res => setPhotos(res.data))
                      //   .catch(err => console.log(err))

                      return (
                        <div key={photo._id} className="mt50">
                          <img className="pic" src={`http://localhost:5000/photos/image/${photo.filename}`} alt="" />
                          <Button className="mt10" fill={true} intent="danger" icon="trash" onClick={ () => {
                            axios.delete(`http://localhost:5000/photos/files/${photo._id}?_method=DELETE`)
                              .then(res => console.log(res))
                              .catch(err => console.log(err))
                          }}>
                            Delete
                          </Button>
                          {/* <form method="POST" action={`http://localhost:5000/photos/files/${photo._id}?_method=DELETE`}>
                            <button className="btn btn-danger btn-block mt-4">
                              Delete
                            </button>
                            <Button className="mt10" fill={true} intent="danger">Delete</Button>
                          </form> */}
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

      </div>

    </div>
  )
}

export default Photos