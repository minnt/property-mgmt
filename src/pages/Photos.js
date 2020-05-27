import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Button, FileInput} from "@blueprintjs/core"

function Photos() {

  const [photos, setPhotos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/photos/')
    .then(res => {
      setPhotos(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  function handleChange() {
    console.log('Hello')
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

          <FileInput className="file-input" disabled={false} text="Choose file..." onInputChange={handleChange} />
          <Button className="file-input mt10" intent="success">Submit</Button>

          <div className="flex-sb">
            <Button className="mt10" intent="warning" onClick={() => {
              var file = "AAAAAA!!!"
              axios.post('http://localhost:5000/photos/upload/', file)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            }}>Test post</Button>
          </div>

          <form action="/photos/upload" method="POST" encType="multipart/form-data">
            <div>
              <input className="mt10" type="file" name="file" id="file" />
              {/* <label htmlFor="file">Choose File</label> */}
            </div>
            <input className="mt10" type="submit" value="Submit" />
          </form>

          <div className="main">
            {
              photos.length > 0 ?
                <>
                  {/* <p>There are {photos.length} photo(s)</p> */}
                  {
                    photos.map(photo => {
                      return (
                        <div key={photo._id}>
                          <img className="pic" src={`http://localhost:5000/photos/image/${photo.filename}`} alt="" />
                          {/* <Button className="mt10" intent="danger">Delete</Button> */}
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