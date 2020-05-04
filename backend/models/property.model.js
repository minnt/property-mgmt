const mongoose = require('mongoose')

const Property = new mongoose.Schema({
  name:       {type: String,  default: ''},
  favorite:   {type: Boolean, default: false},
  street:     {type: String,  default: ''},
  city:       {type: String,  default: ''},
  state:      {type: String,  default: ''},
  zip:        {type: Number,  default: 0},
  image:      {type: String,  default: ''},
  events:     {type: Array,   default: []},
  utilities:  {type: Array,   default: []},
  notes:      {type: Array,   default: []},
  units:      {type: Array,   default: []}
})

module.exports = mongoose.model('Property', Property)