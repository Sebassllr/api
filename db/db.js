const mongoose = require('mongoose')
const keys = require('../config/keys')

mongoose.Promise = global.Promise

require('../api/models/Event')
require('../api/models/Vote')
require('../api/models/FullEvent')

const db = mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
  },
)

module.exports = db
