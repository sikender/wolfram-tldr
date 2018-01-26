const path = require('path')
const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// Not using a proper database here for simplicity.
const adapter = new FileSync(path.resolve(__dirname, '..', 'db.json'))
const db = low(adapter)

passport.use('bearer', new Strategy((token, cb) => {
  const user = db.get('users')
  .find({ token })
  .value()

  if (!user) { return cb(null, false) }
  return cb(null, user)
}))

module.exports = passport
