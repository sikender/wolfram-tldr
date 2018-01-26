const express = require('express')
require('dotenv').config()
var passport = require('./auth')

const app = express()
app.use(passport.initialize())

app.get('/',
  passport.authenticate('bearer', { session: false }),
  function (req, res) {
    res.send('hi')
  })

module.exports = app
