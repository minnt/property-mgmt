const mongoose = require('mongoose')

const Unit = new mongoose.Schema({
  // Attributes available include 'required', 'unique', 'trim', and 'minlength'
  property:     {type: String,  default: '',  required: true},
  number:       {type: Number,  default: 0,   required: true},
  sqFt:         {type: Number,  default: 0},
  rent:         {type: Number,  default: 0},
  bedrooms:     {type: Number,  default: 0},
  bathrooms:    {type: Number,  default: 0},
  pets:         {type: Boolean, default: false},
  tenants:      {type: Array,   default: []},
  events:       {type: Array,   default: []},
  keys:         {type: Number,  default: 0}
})

module.exports = mongoose.model('Unit', Unit)