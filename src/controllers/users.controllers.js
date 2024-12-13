
//services
const userServices = require("../services/users.services.js")

const usersControllers = {

    getUsers: async (req, res) => {    
        try {
            const users = await userServices.getAll();
            res.send(users);

        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    loginUser: async (req,res) =>{
    
        const email = req.body.email;
        const password = req.body.password;    
        
        const tokenGenerate = await userServices.loginOne(email,password)
        res.status(200).send({
            message:"User logged in successfully..!!", 
            token: tokenGenerate,            
        })     
    },
    registerUser: async (req, res) => {
        try{
            const body = req.body; 
            await userServices.createOne(body);

        res.status(201).send("User added.")
        }
        catch (error){
            console.error(error)
            res.status(500).send("Internal Server Error")
        }         
    },
    updateUser: async (req, res) => {
        try {        
            const { id } = req.params;
            const body = req.body;
            await userServices.updateOne(id, body)                
            res.send("A user was updated");

        } catch (error) { res.status(500).send(error.message); }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await userServices.deleteOne(id);
            res.send("A user was deleted");
        } catch (error) {
            res.status(500).send(error.message);
    }}
}
module.exports = usersControllers