const admin = require("firebase-admin");

const dotenv =  require("dotenv");
dotenv.config();

const {getFirestore} = require("firebase-admin/firestore");

const serviceAccount = {

    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    privateKey: process.env.PRIVATEKEY,
    clientEmail: process.env.CLIENTEMAIL,

};

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:process.env.DATABASEURL
});
const db =  getFirestore();

module.exports = db;

