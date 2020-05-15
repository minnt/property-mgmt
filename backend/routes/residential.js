const router = require('express').Router()
const Residential = require('../models/residential.model')

// Get all properties
router.route('/').get((req, res) => {
  Residential.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Get one specific property by ID
router.route('/:id').get((req, res) => {
  Residential.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Add a property
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

// Delete a property by ID
router.route('/:id').delete((req, res) => {
  Residential.findByIdAndDelete(req.params.id)
    .then(() => res.json('Property deleted.'))
    .catch(err => res.status(400).json('Error ' + err))
})

// Update by ID
router.route('/update/:id').post((req, res) => {
  Residential.findById(req.params.id)
    .then(property => {
      property.name = req.body.name
      property.street = req.body.street
      property.city = req.body.city
      property.state = req.body.state
      property.zip = req.body.zip

      property.utilities = req.body.utilities
      property.events = req.body.events
      // { name, street, city, state, zip } = req.body
      property.save()
        .then(() => res.json('Property updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router