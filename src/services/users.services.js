const db = require("../db/firebase.js")
//dependencies
const bcryptjs = require("bcryptjs");

//utils
const handlejwt = require("../utils/jwt.js");

const userServices = {

    //get all docs from db
    getAll: async() => {

        const collection = db.collection("Users");
        const request = await collection.get();
        
        const users = request.docs.map((elements) => {
            return {
                ...elements.data(),                    
                id: elements.id,  
            };
        });

        return users;

    },
    //get one doc from db
    getOne: async() => {},
    loginOne: async(email,password) =>{


        const collection = db.collection("Users");         
        const userFinded = await collection.where("email", "==", email).get();
    
        if (userFinded.docs.length === 0) {throw new Error("User could not log in. Email incorrect!!")};    
        
        const userDoc = userFinded.docs[0];
        
        const user = {           
            ...userDoc.data(), 
        }        
        const passwordMatch = bcryptjs.compareSync(password, user.password);
    
        if (passwordMatch === false) {throw new Error("User could not log in. Password incorrect.!!")
        };
        
        
        const token = handlejwt.encrypt(user);
        return token;          

    },
    //create one doc on db
    createOne: async(body) => {

        if(!body.email || !body.password){
             throw new Error("Email and password are required.");        }
        
        const passwordCrypt = bcryptjs.hashSync(body.password,10)       
        
        const collection = db.collection("Users");    
        
        const user ={
            name: body.name,
            email: body.email,        
            password: passwordCrypt,
        };  
        await collection.add(user);   
    },
    //update one doc on db
    updateOne: async(id, body) => {

        const collection = db.collection("Users");
        const passwordCrypt = bcryptjs.hashSync(body.password,10);
        const updateBody = {...body,password: passwordCrypt};
        await collection.doc(id).update(updateBody);

    },
    //delete one doc from db
    deleteOne: async(id) => {

        const collection = db.collection("Users");
        await collection.doc(id).delete();

    }

};

module.exports = userServices;