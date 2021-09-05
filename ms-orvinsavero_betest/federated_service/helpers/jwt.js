const jwt  = require('jsonwebtoken')
module.exports = {
    sign: function(value) {
      return jwt.sign(value, process.env.SECRET)
    },
    verify: function(token) {
      return jwt.verify(token, process.env.SECRET)
    }
  }