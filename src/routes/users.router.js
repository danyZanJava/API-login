const express = require("express");
const db = require("../db/firebase.js")

const usersRouter = express.Router();

//--------CONSULTA/OBTENER DATOS-------------------------------------------------------------------------------------------
usersRouter.get("/users", async (req, res) => {

    const collection = db.collection("Users");
    const request = await collection.get();
    const users = request.docs.map((elements) =>{
        return{
            ...elements.data(),
           id:elements.id,
        }
    })
    res.send(users);

});
//----------AGREGAR DATOS-----------------------------------------------------------------------------------------
usersRouter.post("/users", async (req, res) => {

    const body = req.body;
    const collection = db.collection("Users");
    await collection.add(body),

    res.send("Se agrego un usuario")

});
//---------------ACTUALIZAR DATOS------------------------------------------------------------------------------------
usersRouter.put("/users/id", async(req, res) => {

    const body = req.body;
    const id = req.params.id;
    const collection = db.collection("Users");
    await collection.doc(id).update(body);

    res.send("Se actualizo un usuario");
    //res.send("users[]");

});
//-------------ELIMINAR DATOS--------------------------------------------------------------------------------------
usersRouter.delete("/users/id", async(req, res) => {

    const id = req.params.id;
    const collection = db.collection("Users");
    await collection.doc(id).delete();
    res.send("Se elimino un usuario")

});

module.exports = usersRouter;