const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FullEvent = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    characteristics: {type: Array, required: true},
    calification: {type: Array},
  },
  { collection: 'sh_finalEvent' },
)

module.exports = mongoose.model('FullEvent', FullEvent)