const express = require("express");
const db = require("../db/firebase.js")

const subesRouter = express.Router();
//-------------------------------------------------------------------------------------------------
subesRouter.get("/subes", async (req, res) => {

    //buscamos la coleccion Sube
    const collection = db.collection("Sube");

    // buscamos los registros/datos en "Sube"
    const request = await collection.get(); 

    //obtengo los datos de todo el array "Sube" con map()
    const subes = request.docs.map((elements)=>{
        return{
            ...elements.data(),
            id:elements.id,
        }
    })
    res.send(subes);
});
//------------------------------------------------------------------------------------------------
subesRouter.post("/subes", async(req, res) => {

    // Obtenemos el body
    const body = res.body;

    // Selecciono la coleccion
    const collection = db.collection("Sube");

    // Agrego un elemento a la coleccion
    await collection.add(body);


    res.send("Se agrego elemento a la coleccion Sube");

});
//----------------------------------------------------------------------------------------------
subesRouter.put("/subes/id", async(req, res) => {

    const body = req.body;
    const id = req.params.id;
    const collection = db.collection("Subes");
    await collection.doc(id).update(body);
    res.send("Se actualizo una sube");

});
//----------------------------------------------------------------------------------------------
subesRouter.delete("/subes/id",async(req, res) => {

    const id = req.params.id;
    const collection = db.collection("Subes");
    await collection.doc(id).delete();

    res.send("Se elimino una sube");

});
module.exports = subesRouter;