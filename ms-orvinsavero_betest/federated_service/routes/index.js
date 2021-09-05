const routes = require("express").Router()
const { Authentication } = require("../middlewares/auth.js")
const { Authorization } = require("../middlewares/auth.js")
const Controller = require("../controllers/controller.js")
const UserRoute = require("./user-route.js");


routes.post("/generate_token", Controller.generateToken)
routes.use("/user", UserRoute)

module.exports = routes