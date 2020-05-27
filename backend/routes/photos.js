const router          = require('express').Router()
const express         = require('express')
const bodyParser      = require('body-parser')
const path            = require('path')
const crypto          = require('crypto')
const mongoose        = require('mongoose')
const multer          = require('multer')
const GridFsStorage   = require('multer-gridfs-storage')
const Grid            = require('gridfs-stream')
const methodOverride  = require('method-override')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(methodOverride('_method'))

// Mongo URI
const mongoURI = 'mongodb://localhost/files'

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

// Init gfs
let gfs

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
  console.log('Stream initialized!')
})

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        console.log(file)
        resolve(fileInfo)
      })
    })
  }
})

const upload = multer({storage})

// Get all the files as JSON data
router.route('/').get((req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    // Files exist
    return res.json(files)
  })
})

// Upload single file
app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({msg: 'Hello'})
  res.json({msg: req.body})
})

// @route GET /image/:filename
// @desc Display image
router.route('/image/:filename').get((req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    // Check if it exists
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      })
    }

    // Check if its an image
    if (file.contentType === 'image/jpeg' || file.contentType ==='image/png') {
      // Read output to browswer
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({
        err: 'Not an image'
      })
    }
  })
})

module.exports = router