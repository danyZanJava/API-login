
//dependencies
const admin = require("firebase-admin");
const dotenv =  require("dotenv");
const {getFirestore} = require("firebase-admin/firestore");

//Allow environment variables
dotenv.config();

//Firebase app credentials
const serviceAccount = {

    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    privateKey: process.env.PRIVATEKEY,   
    clientEmail: process.env.CLIENTEMAIL,
    databaseURL: process.env.DATABASEURL,
};
//Firebase app initialization
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:process.env.DATABASEURL
});
//Firestore referencies
const db =  getFirestore();

module.exports = db;

