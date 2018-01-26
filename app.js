const express = require('express')
require('dotenv').config()
var passport = require('./auth')

const app = express()
app.use(passport.initialize())

app.use('/api/v1/query',
        passport.authenticate('bearer', { session: false }),
        require('./routes/v1/index'))

module.exports = app
