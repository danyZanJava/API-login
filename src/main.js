const express = require("express");
const app = express();
const cors = require("cors");//el paquete CORS (Cross-Origin Resource Sharing), que es una middleware que permite
                             // o restringe las solicitudes HTTP que provienen de
                             // diferentes orígenes (dominios) a tu servidor.

const usersRouter = require("./routes/users.router.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))//Habilitamos a la api a que pueda acceder a 
                                             //los archivos estaticos los cuales estan en la carpeta public


app.use("/users", usersRouter);


// Configurar CORS para aceptar solicitudes desde localhost
app.use(cors({
  origin: "http://localhost:3000", // Asegúrate de que tu frontend esté sirviendo en este puerto
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.get('/front', (req, res) => {
  res.sendFile( __dirname + "/public/index.html" );//Crea una ruta de donde accedo al index.html
});

app.listen(3000, () => {
  console.log("Server Up and running ..!!");
});


