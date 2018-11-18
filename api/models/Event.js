const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoteEvent = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    closeVot: {type: String, required: true},
    characteristics: {type: Array, required: true}
  },
  { collection: 'sh_event' },
)

module.exports = mongoose.model('Event', VoteEvent)
