const mongoose = require('mongoose')

const Residential = new mongoose.Schema({
  name:       {type: String,  default: ''},
  type:       {type: String,  default: ''},  // Necessary?
  favorite:   {type: Boolean, default: false},
  street:     {type: String,  default: ''},
  city:       {type: String,  default: ''},
  state:      {type: String,  default: ''},
  zip:        {type: Number,  default: 0},
  // image:      {type: String,  default: ''},
  events:     {type: Array,   default: []},
  utilities:  {type: Object,  default: {}},
  notes:      {type: Array,   default: []},
  units:      {type: Array,   default: []},
  updatedOn:  {type: Date,    default: null},
  coverPhoto: {type: String,  default: ''}
})

module.exports = mongoose.model('Residential', Residential, 'residential')  // 3rd parameter is collection name