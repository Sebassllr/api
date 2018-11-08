const express = require('express')

const eventRoutes = require('./EventRoutes')

const router = express.Router()

router.use('/', eventRoutes)

module.exports = router