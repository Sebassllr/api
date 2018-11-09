const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FullEvent = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    place: {type: String, required: true}
  },
  { collection: 'sh_finalEvent' },
)

module.exports = mongoose.model('FullEvent', FullEvent)