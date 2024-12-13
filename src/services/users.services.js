//dependencies
const db = require("../db/firebase.js")
const bcryptjs = require("bcryptjs");
//utils
const handlejwt = require("../utils/jwt.js");

const userServices = {
    //get all docs from db -----------------------------------------------------------------------------------------------------
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
    
    //loginOne doc from db -----------------------------------------------------------------------------------------------------
    loginOne: async(email,password) =>{ 

        /* This code snippet is querying the database to find a user based on their email address
        during a login operation. Here's a breakdown of what it does: */
        const collection = db.collection("Users");         
        const userFinded = await collection.where("email", "==", email).get();
    
        if (userFinded.docs.length === 0) 
            {throw new Error("User could not log in. Email incorrect!!")}; 
           
        //The first document in the result set (docs[0]) is taken.
        const userDoc = userFinded.docs[0];
        
        const user = {           
            ...userDoc.data(), 
        } 
        //-------------------------------------------------------------------------------------------------       
        const passwordMatch = bcryptjs.compareSync(password, user.password);
    
        if (passwordMatch === false) 
            {throw new Error("User could not log in. Password incorrect.!!")};                   
        
        const token = handlejwt.encrypt(user);
        return token; 
    },    
    //create one doc on db----------------------------------------------------------------------------------------------------
    createOne: async(body) => {

        if(!body.email || !body.password){
             throw new Error("Email and password are required."); }  
       
        
        const collection = db.collection("Users"); 
        
        //Verifica si hay usuario con el mismo mail
        const existingUserSnapshot = await collection.where("email", "==", body.email).get();            
            
        if(!existingUserSnapshot.empty){throw new Error("El usuario ya existe") };                 
                
             
        
        const passwordCrypt = bcryptjs.hashSync(body.password, 10)
        
        const user ={
            name: body.name,
            email: body.email,        
            password: passwordCrypt,
        };  
        await collection.add(user);   
    },
    //update one doc on db------------------------------------------------------------------------------------------------
    updateOne: async(id, body) => {

        const collection = db.collection("Users");
        const passwordCrypt = bcryptjs.hashSync(body.password,10);
        const updateBody = {...body,password: passwordCrypt};
        await collection.doc(id).update(updateBody);

    },
    //delete one doc from db-----------------------------------------------------------------------------------------------
    deleteOne: async(id) => {

        const collection = db.collection("Users");
        await collection.doc(id).delete();
    }
};
module.exports = userServices;