
// Dependencies
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const {getFirestore} = require("firebase-admin/firestore");

//var environment configuration 
dotenv.config(); 

 // Firestore configuration
const serviceAccount = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    privateKey: process.env.PRIVATEKEY,
    clientEmail: process.env.CLIENTEMAIL,
    databaseURL: process.env.DATABASEURL,
};

//Admin initialation
 admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:process.env.DATABASEURL,
 })
 const db = getFirestore();

 module.exports = db;



