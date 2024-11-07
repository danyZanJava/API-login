
// Dependencies

const admin = require("firebase-admin");
const dotenv = require("dotenv");
const {getFirestore} = require("firebase-adimin/firestore");

dotenv.config(); // CONFI VAR ENTORNO

const serviceAccount = { // CONFIG FIRESTORE

    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    privateKey: process.env.PRIVATEKEY,
    clientMail: process.env.CLIENTMAIL,
    databaseUrl: process.env.DATABASEURL,
}
 // initialize app Firestore

 admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:process.env.DATABASEURL,
 })
 const db = getFirestore();

 module.exports = db;



