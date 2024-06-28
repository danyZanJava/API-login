const express = require("express");
const app = express();

const usersRouter = require("./routes/users.router.js");
const subesRouter = require("./routes/subes.router.js")


app.use(express.json());
app.use(express.urlencoded());

app.use("/", usersRouter);
app.use("/", subesRouter);

app.listen(8080, () => { console.log("Server Up!") });

