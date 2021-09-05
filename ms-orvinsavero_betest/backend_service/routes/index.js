const routes = require("express").Router()
const UserRoute = require("./user-route.js");


routes.use("/user", UserRoute)


module.exports = routes