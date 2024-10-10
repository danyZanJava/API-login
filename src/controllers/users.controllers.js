//dependencies
const bcryptjs = require("bcryptjs");
//db connection
const db = require("../db/firebase.js");

//utils
const handlejwt = require("../utils/jwt.js");
const usersControllers = {
    getUsers: async (req, res) => {
    
        try {
            const collection = db.collection("Users");
            const request = await collection.get();        
            const users = request.docs.map((elements) => {
                return {
                    ...elements.data(),
                    
                    id: elements.id,
                };
            });
            res.send(users);
        } catch (error) {
            res.status(500).send(error.message);
            }
    },
    loginUser: async (req,res) =>{
    
        const email = req.body.email;
        const password = req.body.password;    
        
        const collection = db.collection("Users");       
         
        const userFinded = await collection.where("email", "==", email).get();
    
        if (userFinded.docs.length === 0) {res.status(400).send ("Usuario no se pudo logear.x email incorrecto.!!")};    
        
        const userDoc = userFinded.docs[0];
        
        const user = {
           
            ...userDoc.data(),        }
        
        const passwordMatch = bcryptjs.compareSync(password, user.password);
    
        if (passwordMatch === false) {
            res.status(400).send ("Usuario no se pudo loggear..!!")
        };
        const token = handlejwt.encrypt(user);     
        
        res.status(200).send({
            message:"Usuario logueado exitosamente..!!", 
            token: token,
            exitoso:1 
        })     
    },
    registerUser: async (req, res) => {
        try{
            const body = req.body; 
             
        if(!body.email || !body.password){
            return res.status(400).send("Email y contraseña son requeridos");        }
        
        const passwordCrypt = bcryptjs.hashSync(body.password,10)        
        
        const collection = db.collection("Users");    
        
        const user ={
            name: body.name,
            email: body.email,        
            password: passwordCrypt,
        };          
        await collection.add(user);        
        res.status(201).send("Usuario agregado")
        }
        catch (error){
            console.error("Error al agregar un usuario, error")
            res.status(500).send("Error interno del servidor")
        }         
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const collection = db.collection("Users");
            const body = req.body;
            const passwordCrypt = bcryptjs.hashSync(body.password,10)
            const updateBody = {...body,password: passwordCrypt} 
            await collection.doc(id).update(updateBody);
                                                 
            res.send("Se actualizó un usuario");
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
    
            const collection = db.collection("Users");
            await collection.doc(id).delete();
            res.send("Se eliminó un usuario");
        } catch (error) {
            res.status(500).send(error.message);
    }}
}
module.exports = usersControllers