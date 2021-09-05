const axios = require("axios");
const redis = require('../helpers/redisConnection.js')
const backendURL = `http://localhost:3001/backend/user/`;

class UserController{
    static createUser(req, res, next){
        let body = req.body
        let payload = {
            userName: body.userName,
            accountNumber: body.accountNumber,
            emailAddress: body.emailAddress,
            identityNumber: body.identityNumber
        }
        axios({
            method: "POST",
            url: `${backendURL}/create`,
            data: payload
          })
            .then(({ data }) => {
              res.status(201).json(data)
            })
            .catch(next);
    }
    static readUserByAccountNumber(req, res, next) {
        let accountNumber = req.params.accNum
        redis.get(`accNum_${accountNumber}`, (err, value) => {
          if (value != null) {
              res.status(200).json(JSON.parse(value))
          } else if (err){
              next({code: 400});
          } else {
              axios({
                method: "GET",
                url: `${backendURL}/read/account_number/${accountNumber}`
              })
                .then(({ data }) => {
                  redis.set(`accNum_${accountNumber}`, JSON.stringify(data)), (err) => {
                    console.log(`Error: ${err}`)
                    next()
                };
                redis.expire(`accNum_${accountNumber}`, 5);

                  res.status(200).json(data)
                })
                .catch(next);
          }
        })

    }

    static readUserByIdentityNumber(req, res, next) {
        let identityNumber = req.params.idNum
        redis.get(`idNum${identityNumber}`, (err, value) => {
          if (value != null) {
              res.status(200).json(JSON.parse(value))
          } else if (err){
              next({code: 400});
          } else {
            axios({
                method: "GET",
                url: `${backendURL}/read/identity_number/${identityNumber}`
              })
                .then(({ data }) => {
                  redis.set(`idNum${identityNumber}`, JSON.stringify(data)), (err) => {
                    console.log(`Error: ${err}`)
                    next()
                };
                  res.status(200).json(data)
                })
                .catch(next);
          }
        })
    }

    static updateUserData(req, res, next) {
        console.log(req.body)
        let type = 'accNum'
        let param = null

        if (req.params.accNum){
            param = req.params.accNum
        } else {
          type = 'idNum'
            param = req.params.idNum
        }
        let payload = {}
        for (let key in req.body){
          if (key == 'userName' || key == 'accountNumber' || key == 'emailAddress' || key == 'identityNumber'){
            payload[key] = req.body[key]
          }
        }
        axios({
            method: "PATCH",
            url: `${backendURL}/update/${type}/${param}`,
            data: payload
          })
            .then(({ data }) => {
              console.log(data);
              res.status(200).json(data)
            })
            .catch(next);
    }

    static deleteUserData(req, res, next) {
        console.log(req.body)
        let type = 'accNum'
        let param = null

        if (req.params.accNum){
            param = req.params.accNum
        } else {
          type = 'idNum'
            param = req.params.idNum
        }
        axios({
            method: "DELETE",
            url: `${backendURL}/delete/${type}/${param}`
          })
            .then(({ data }) => {
              console.log(data);
              res.status(200).json(data)
            })
            .catch(next);
    }     
}




module.exports = UserController