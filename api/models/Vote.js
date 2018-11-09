const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Vote = new Schema(
  {
    id: {type: String, required: true},    
    date1: {type: Number, required: true},
    date2: {type: Number, required: true},
    date3: {type: Number, required: true},
    time1: {type: Number, required: true},
    time2: {type: Number, required: true},
    time3: {type: Number, required: true},
    place1: {type: Number, required: true},
    place2: {type: Number, required: true},
    place3: {type: Number, required: true},
  },
  { collection: 'sh_vote' }
)

module.exports = mongoose.model('Vote', Vote)