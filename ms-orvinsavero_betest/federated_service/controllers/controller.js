const jwt = require('../helpers/jwt.js');
const redis = require('../helpers/redisConnection.js')
const generateNumber = require('../helpers/generateNumber.js')

class Controller{
    static generateToken(req, res, next){
        let keyNumber = generateNumber
        let valueNumber = generateNumber

        redis.set(keyNumber, valueNumber), (err) => {
            console.log(`Error: ${err}`)
            next()
        };
        let signed = jwt.sign({
            key: keyNumber,
            value: valueNumber
        })
        redis.expire(keyNumber, 1800);
        res.header('Authorization', signed)
        res.status(200).json('Token Generated')
    }
}

module.exports = Controller