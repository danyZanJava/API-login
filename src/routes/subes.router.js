const express = require("express");
const db = require("../db/firebase.js")

const subesRouter = express.Router();

subesRouter.get("/subes", (req, res) => {

    res.send("Se obtuvieron las subes");

});

subesRouter.post("/subes", (req, res) => {

    res.send("Se creo una sube");

});

subesRouter.put("/subes", (req, res) => {

    res.send("Se actualizo una sube");

});

subesRouter.delete("/subes", (req, res) => {

    res.send("Se elimino una sube");

});

module.exports = subesRouter;