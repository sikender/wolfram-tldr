const express = require('express')
const helmet = require('helmet')
const apicache = require('apicache')
require('dotenv').config()
var passport = require('./auth')

const app = express()
app.use(helmet())
app.use(passport.initialize())
let cache = apicache.middleware

app.use('/api/v1/query',
        passport.authenticate('bearer', { session: false }),
        cache('10 minutes'),
        require('./routes/v1/index'))

module.exports = app
