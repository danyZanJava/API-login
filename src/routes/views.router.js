const express = require("express");

const viewsRouter = express.Router();

viewsRouter.get('/home', (req, res) => {
    res.sendFile( __dirname + "/public/index.html" );
  });

module.exports = viewsRouter;