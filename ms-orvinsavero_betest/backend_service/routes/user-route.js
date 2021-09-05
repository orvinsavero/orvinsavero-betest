const routes = require("express").Router();
const UserController = require("../controllers/user-controller.js");


routes.post("/create", UserController.createUserToDB)
routes.get("/read/account_number/:accountNumber", UserController.readOneUserFromDB)
routes.get("/read/identity_number/:identityNumber", UserController.readOneUserFromDB)
routes.patch("/update/:type/:num", UserController.updateUserData)
routes.delete("/delete/:type/:num", UserController.deleteUserData)

module.exports = routes;
