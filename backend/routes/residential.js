// const express = require('express')
// const router = express.Router()
const router = require('express').Router()
const Residential = require('../models/residential.model')

router.get('/', (req, res, next) => {
  Residential.find()
    .then(properties => {
      res.json({
        confirmation: 'success',
        data: properties
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        message: err.message
      })
    })
})

// router.get('/add', (req, res, next) => {
//   const details = req.query
//   res.json({
//     confirmation: 'success',
//     data: details
//   })

//   Residential.create(details)
//     .then(property => {
//       res.json({
//         confirmation: 'success',
//         data: property
//       })
//     })
//     .catch(err => {
//       res.json({
//         confirmation: 'failure',
//         message: err.message
//       })
//     })
// })

router.route('/add').post((req, res) => {
  const newProperty = new Residential({
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  })

  newProperty.save()
    .then(() => res.json('Property added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/update/:id', (req, res, next) => {
  const updatedDetails = req.query
  const propertyId = req.params.id

  Residential.findByIdAndUpdate(propertyId, updatedDetails, {new: true})
    .then(property => {
      res.json({
        confirmation: 'success',
        data: property
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
  Residential.findById(req.params.id)
    .then(property => {
      res.json({
        confirmation: 'success',
        data: property
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: 'Property not found: ' + req.params.id
      })
    })
})

module.exports = router