//Dependencies
const express = require("express");

const usersControllers = require("../controllers/users.controllers.js");

//Router
const usersRouter = express.Router();

// get all users
usersRouter.get("/", usersControllers.getUsers);

// login user
usersRouter.post("/login", usersControllers.loginUser);

//register user
usersRouter.post("/register", usersControllers.registerUser); 
//update one user

usersRouter.put("/:id",usersControllers.updateUser);

//delete one user
usersRouter.delete("/:id", usersControllers.deleteUser);

module.exports = usersRouter;

