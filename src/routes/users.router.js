const express = require("express");

const usersRouter = express.Router();
const db = require("../db/firebase.js")

usersRouter.get("/users", (req, res) => {

    res.send("Se obtuvieron los usuarios");

});

usersRouter.post("/users", (req, res) => {

    res.send("Se creo un usuario")

});

usersRouter.put("/users", (req, res) => {

    res.send("Se actualizo un usuario");

});

usersRouter.delete("/users", (req, res) => {

    res.send("Se elimino un usuario")

});

module.exports = usersRouter;