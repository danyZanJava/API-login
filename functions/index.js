
const app = require ("./src/main.js");
const functionFirebase = require ("firebase-functions");
exports.api = functionFirebase.https.onRequest(app);