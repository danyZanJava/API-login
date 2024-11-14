const db = require("../db/firebase.js")

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
    //create one doc on db
    createOne: async(body) => {

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