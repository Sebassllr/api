const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoteEvent = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    date1: {type: String, required: true},
    date2: {type: String, required: true},
    date3: {type: String},
    time1: {type: String, required: true},
    time2: {type: String, required: true},
    time3: {type: String},
    place1: {type: String, required: true},
    place2: {type: String, required: true},
    place3: {type: String},
    closeVot: {type: String, required: true}
  },
  { collection: 'sh_event' },
)

module.exports = mongoose.model('Event', VoteEvent)
