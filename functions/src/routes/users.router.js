//Dependencies
const express = require("express");
const usersControllers = require("../controllers/users.controllers.js");

//Middlewares
const authMiddleware = require("../middlewares/auth.middleware.js")

//Router
const usersRouter = express.Router();

// get all users 7// todo securutuzar endpoint
usersRouter.get("/", authMiddleware, usersControllers.getUsers);

// login user
usersRouter.post("/login", usersControllers.loginUser);

//register user
usersRouter.post("/register", usersControllers.registerUser);

//update one user
usersRouter.put("/:id",authMiddleware,usersControllers.updateUser);

//delete one user
usersRouter.delete("/:id",authMiddleware, usersControllers.deleteUser);

module.exports = usersRouter;

