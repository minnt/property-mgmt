const express = require('express')
const router = express.Router()
const City = require('../models/city.model')

router.get('/', (req, res, next) => {
  const query = req.query

  City.find(query)
    .then(cities => {
      res.json({
        confirmation: 'success',
        data: cities
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        message: err.message
      })
    })
})

router.get('/:id', (req, res, next) => {
  City.findById(req.params.id)
    .then(city => {
      res.json({
        confirmation: 'success',
        data: city
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: 'City not found' + req.params.id
      })
    })
})

module.exports = router