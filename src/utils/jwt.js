//dependencies
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require ("dotenv");
// Allow environment variables
dotenv.config();

//JWT utils
const handlejwt = {
       
   encrypt:(user) => {  

        const token = jsonwebtoken.sign(
        { id:user.id,name:user.name},                
        process.env.JWTSECRET,                
        {expiresIn: "24h"})
        return token;
   },   
   verify: (token) => {
              
        const verifyToken = jsonwebtoken.verify(token, process.env.JWTSECRET)
        return verifyToken;
   }   
}
module.exports = handlejwt;