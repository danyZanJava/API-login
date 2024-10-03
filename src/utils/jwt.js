
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require ("dotenv");
dotenv.config();

const handlejwt = {
       
   encrypt:(user) => {  ///---------------funcion para  ENCRIPTAR un token ------------------------------

        const token = jsonwebtoken.sign(
        {           //PAYLOAD -> (datos que vamos a guardar en el token)
        id:user.id,
        name:user.name,        
        },
                //Llave del token guardada en una variable de entorno 
        process.env.JWTSECRET, 

                //Tiempo de duracion del token. Puede durar tambien indefinidamente, sin un tiempo declarado
        {expiresIn: "24h"})

        return token;
   },
   //------------------- funcion para VERIFCAR O VALIDAR si ése token sirve --------------------------------
   verify: (token) => {

              //---------------Verifca si el token es TRUE O FALSE----------------------------------------------
        const verifyToken = jsonwebtoken.verify(token, process.env.JWTSECRET)
        return verifyToken;
   }   
}
module.exports = handlejwt;