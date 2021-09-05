const jwt = require("../helpers/jwt.js");
const redis = require('../helpers/redisConnection.js')

module.exports = {
    Authorization: function(req, res, next) {
        let token = req.headers.authorization;
        let decoded = null;
        try {
            decoded = jwt.verify(token);
            redis.get(decoded.key, (err, value) => {
            if (value == decoded.value) {
                next()
            } else {
                next({code: 400});
            }
        })
        } catch {
              next({code: 400});
          }
        }
};
