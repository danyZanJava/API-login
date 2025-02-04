
const app = require ("./src/main.js");
const functionFirebase = require ("firebase-functions");
const dotenv = require ("dotenv");
dotenv.config();
if (process.env.ENVIRONMENT == "development"){
    app.listen(3000, () => {
        console.log("Server Up and running ..!!");
    })         
}
else{
    exports.api = functionFirebase.https.onRequest(app);
}




