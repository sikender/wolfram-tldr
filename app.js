const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const apicache = require('apicache')
const RateLimit = require('express-rate-limit')
const passport = require('./auth')

require('dotenv').config()
const app = express()
app.use(helmet())
app.use(passport.initialize())
app.use(morgan('common'))

let cache = apicache.middleware
const limiter = new RateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  delayMs: 0
})

app.use('/api/v1/query',
        limiter,
        passport.authenticate('bearer', { session: false }),
        cache('10 minutes'),
        require('./routes/v1/index'))

module.exports = app
