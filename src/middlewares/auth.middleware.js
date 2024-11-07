const handlejwt = require ("../utils/jwt.js") ;

const authMiddleware = async(req,res, next) =>{

    const token = req.headers.autorization; 

    const verifyToken = handlejwt.verify(token);
    

    if(verifyToken === true){
        next();
    }else{
        res.status(400).json({message:"Token is false"})
    }
};
module.exports = authMiddleware();