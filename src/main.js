//Dependencies
const express = require("express");
const cors = require("cors");

//Routers
const usersRouter = require("./routes/users.router.js");
const viewsRouter = require("./routes/views.router.js");

//app instance
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors({
  origin: "http://localhost:3000",       
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

//endpoints
app.use("/users", usersRouter);
app.use("/views", viewsRouter);

//app initialization
app.listen(3000, () => {
  console.log("Server Up and running ..!!");
});


