const routes = require("express").Router();
const UserController = require("../controllers/user-controller.js");
const { Authorization } = require("../middlewares/auth.js");


routes.use(Authorization)
routes.post("/create", UserController.createUser)
routes.get("/read/account_number/:accNum", UserController.readUserByAccountNumber)
routes.get("/read/identity_number/:idNum", UserController.readUserByIdentityNumber)
routes.patch("/update/account_number/:accNum", UserController.updateUserData)
routes.patch("/update/identity_number/:idNum", UserController.updateUserData)
routes.delete("/delete/account_number/:accNum", UserController.deleteUserData)
routes.delete("/delete/identity_number/:idNum", UserController.deleteUserData)

module.exports = routes;
