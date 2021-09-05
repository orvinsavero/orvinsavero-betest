const User = require("../models/user.js")
const ObjectID = require('mongodb').ObjectID;

class UserController{
    static createUserToDB(req, res, next){
        let body = req.body
        let payload = {
        userName: body.userName,
        accountNumber: body.accountNumber,
        emailAddress: body.emailAddress,
        identityNumber: body.identityNumber
        }
        User.create(payload)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static readOneUserFromDB(req, res, next) {
        let obj = {}
        for (let key in req.params){
            obj[key] = req.params[key]
        }
        User.findOne(obj)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
      }

    static updateUserData(req, res, next){
        let filter = {}
        if (req.params.type == 'idNum'){
            filter.identityNumber = req.params.num
        } else {
            filter.accountNumber = req.params.num
        }
        let payload = req.body
        User.updateOne(
            filter,
            {$set: payload})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static deleteUserData(req, res, next){
        let filter = {}
        if (req.params.type == 'idNum'){
            filter.identityNumber = req.params.num
        } else {
            filter.accountNumber = req.params.num
        }
        User.deleteOne(filter)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = UserController