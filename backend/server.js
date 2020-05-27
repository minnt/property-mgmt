const express   = require('express')
const cors      = require('cors')
const mongoose  = require('mongoose')

// Connect to the MongoDB
mongoose.connect('mongodb://localhost/properties', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(data => {
    console.log('MongoDB connection success!')
  })
  .catch(err => {
    console.log('MongoDB connection failed:' + err.message)
  })

const app = express()

app.use(cors())
app.use(express.json())

const residential = require('./routes/residential')
const photos      = require('./routes/photos')

app.use('/residential', residential)
app.use('/photos',      photos)

app.listen(5000)
console.log('App running on http://localhost:5000')