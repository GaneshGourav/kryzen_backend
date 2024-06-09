const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user-controller");

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

module.exports = userRouter;
