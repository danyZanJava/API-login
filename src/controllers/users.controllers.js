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
                    id: elements.id,  };
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
    
        if (userFinded.docs.length === 0) {res.status(400).send ("User could not log in. Email incorrect!!")};    
        
        const userDoc = userFinded.docs[0];
        
        const user = {           
            ...userDoc.data(), 
        }
        
        const passwordMatch = bcryptjs.compareSync(password, user.password);
    
        if (passwordMatch === false) {
            res.status(400).send ("User could not log in. Password incorrect.!!")
};
        
        const token = handlejwt.encrypt(user);     
        
        res.status(200).send({
            message:"User logged in successfully..!!", 
            token: token,
            exitoso:1 
        })     
    },
    registerUser: async (req, res) => {
        try{
            const body = req.body; 
             
        if(!body.email || !body.password){
            return res.status(400).send("Email and password are required.");        }
        
        const passwordCrypt = bcryptjs.hashSync(body.password,10)        
        
        const collection = db.collection("Users");    
        
        const user ={
            name: body.name,
            email: body.email,        
            password: passwordCrypt,
        };          
        await collection.add(user);        
        res.status(201).send("User added.")
        }
        catch (error){
            console.error("Error adding a user..!!")
            res.status(500).send("Internal Server Error")
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
                                                 
            res.send("A user was updated");
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
    
            const collection = db.collection("Users");
            await collection.doc(id).delete();
            res.send("A user was deleted");
        } catch (error) {
            res.status(500).send(error.message);
    }}
}
module.exports = usersControllers