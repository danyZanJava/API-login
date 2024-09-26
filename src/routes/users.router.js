// const express = require("express");
// const express = require("express");
// const bcryptj = require("bcryptjs");
// const db = require("../db/firebase.js");


// const usersRouter = express.Router();
// // Middleware to parse Json bodies (los formularios)
// userRouter.use(express.json());

// //-----------GET/CONSULTA/OBTENER DATOS----------------------------------------------------------------------


// userRouter.get("/users", async (req,res) => {
//     const collection = db.collection("Users");
//     const request = await collection.get();
//     const users = request.docs.map((elements) =>{
//         return{
//             ...elements.data(),
//            id:elements.id,
//         }
//     })
//     res.send(users);
// })    
// //--------GET/AUTENTICACION/LOGIN USUARIO-------------------------------------------------------------------------------------------

// usersRouter.get("/users/login", async (req, res) => {

//     //obtenemos el email y password desde el formulario(body)
//     const email = req.body.email;
//     const password = req.body.password;

//     //Seleccionamos la coleccion("Users")
//     const collection = db.collection("Users");

//     //Buscamos un registro cuyo campo "email" sea igual "==" a al email
//     //que tomamos del formulario y lo obtenemos de (.get())
//     const userFinded = await collection.where ("email", "==", email).get();

//     //Si no hay usuario con ése email lanzamos un ERROR
//     if(!userFinded){
//         return res.status(401).send("Invalid email or password");
//     }
//     //Tomamos el usuario encontrado!!
//     const userDoc = userFinded.docs[0];

//     const user = {
//         id:userDoc.id,
//         ...userDoc.data(),
//     }
//     //Hacemos la comparacion de la contraseña con el metodo compareSync()
//     //pasamos como primer parametro, la contraseña cargada en el formulario del login
//     //y como segundo parametro el password encriptado guardado en la base de datos
//     //el resultado puede ser True o False y guardamos en passwordMatch
//     const passwordMatch = bscripjs.compareSync(password, user.password);

//     //Si la contraseña no coincide enviamos un mensaje
//     if(passwordMatch){
//         return res.status(404).send("Invalid email or password");
//     }
//     //En el caso de que todo haya salido bien envie mensaje que el usuario se logueó.
//     res.status(200).send({
//         message: "User logged in",
//         user:user,        
//     })
// });
// //----------AGREGAR DATOS-----------------------------------------------------------------------------------------
// usersRouter.post("/users", async (req, res) => {

//     const body = req.body;
//     const collection = db.collection("Users");    
//     await collection.add(body),

//     res.send("Se agrego un usuario")

// });
// //---------ACTUALIZAR DATOS BY (ID)------------------------------------------------------------------------------------
// usersRouter.put("/users/id", async(req, res) => {

    
//     const id = req.params.id;
//     const collection = db.collection("Users");
//     const body = req.body;
//     await collection.doc(id).update(body);

//     res.send("Se actualizo un usuario");
//     //res.send("users[]");

// });
// //-------------ELIMINAR DATOS--------------------------------------------------------------------------------------
// usersRouter.delete("/users/id", async(req, res) => {

//     const id = req.params.id;
//     const collection = db.collection("Users");
//     await collection.doc(id).delete();
//     res.send("Se elimino un usuario")

// });

// module.exports = usersRouter;
const express = require("express");
const usersRouter = express.Router();
const bcryptjs = require("bcryptjs");
 //La línea `const bcryptjs = require("bcryptjs");` importa la biblioteca bcryptjs en el código JavaScript.
//Esta biblioteca se usa comúnmente para hacer hashes de contraseñas y comparar contraseñas con hashes para fines de autenticación.
// Al requerir la biblioteca bcryptjs, el código obtiene acceso a funciones como
//`hashSync` y `compareSync` que se usan para hacer hashes de contraseñas y compararlas respectivamente.
 //Sirve para hashear la password. 
                                      //(Verficar si esta en los package.jon)
const db = require("../db/firebase.js");
const handlejwt = require("../utils/jwt.js");//importo el Token de seguridad.

//usersRouter.use(express.json());

//-------------------CONSULTA BASICA----------------------------------------------------------------
usersRouter.get("/", async (req, res) => {
    
    try {
        const collection = db.collection("Users");
        const request = await collection.get();        
        const users = request.docs.map((elements) => {
            return {
                ...elements.data(),
                
                id: elements.id,
            };
        });
        res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//--------ACCEDER AL SISTEMA(LOGIN)/BUSCAR USUARIO EN DBase  Y VERIFICAR SU CONTRASEÑA  --------------------
usersRouter.post("/login", async (req,res) =>{

    //obtenemos el email y el password,datos que envias desde el front a traves del
    // formulario (postman)
    //ESTO LO ENVIA EL USUARIO DESDE EL FRONT y da acceso con req.body..
    const email = req.body.email;
    const password = req.body.password;

    // Seleccionamos la coleccion
    const collection = db.collection("Users");
   
     //Buscamos un registro cuyo campo "email" sea igual "==" al email
    //que tomamos(que obtenemos) del formulario y lo obtenemos con (.get())
    const userFinded = await collection.where("email", "==", email).get();

    if (userFinded.docs.length === 0) {res.status(400).send ("Usuario no se pudo logear.x email incorrecto.!!")};

    //Tomamos el usuario encontrado
    const userDoc = userFinded.docs[0];

    //Tomamos los datos del usuario
    const user = {
       
        ...userDoc.data(),
    }
    //Hacemos la comparacion de la contraseña con el metodo compareSync()
    //pasamos como primer parametro la contraseña del formulario y
    //como segundo parametro la contraseña encriptada que esta en la base de datos
    const passwordMatch = bcryptjs.compareSync(password, user.password);

    if (passwordMatch === false) {
        res.status(400).send ("Usuario no se pudo loggear..!!")//si password es incorrecta status 400
    };
    const token = handlejwt.encrypt(user); //generamos token con los datos del usuario,
                                           //el cual usará para autenticarse en la app sube.
    
    //Si todo sale bien respondemos con un mensaje que todo salio bien
    res.status(200).send({
        message:"Usuario logueado exitosamente..!!", 
        token: token,
    }) 
}) 

//----- CREACION DE USUARIOS NUEVOS(sigup)/INSCRIBIRSE POR PRIMERA VEZ en tu aplicación---------------
usersRouter.post("/register", async (req, res) => {
    try{
        const body = req.body; 
    // Validacion de entrada       
    if(!body.email || !body.password){
        return res.status(400).send("Email y contraseña son requeridos");
    }
    //Encriptar contraseña 1234...
    const passwordCrypt = bcryptjs.hashSync(body.password,10)
    
    // Obtener la coleccion de usuarios
    const collection = db.collection("Users");

    //Añadir usuario a la coleccion con sus propiedades
    const user ={
        name: body.name,
        email: body.email,        
        password: passwordCrypt,
    };
    
    //Usando add() method para añadir a Firesbase.
    await collection.add(user);
    // Responder con éxito
    res.status(201).send("Usuario agregado")
    }
    catch (error){
        console.error("Error al agregar un usuario, error")
        res.status(500).send("Error interno del servidor")
    }    
    
});
//------------------------------------ACTUALIZA DATOS-----------------------------------------------------
//Define una ruta para manejar solicitudes HTTP PUT. El :id en la ruta es un parámetro 
//dinámico que indica cuál usuario se va a ACTUALIZAR.
usersRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const collection = db.collection("Users");
        const body = req.body;
        const passwordCrypt = bcryptjs.hashSync(body.password,10)
        const updateBody = {...body,password: passwordCrypt} //Crea body nueveo con password encriptado
        await collection.doc(id).update(updateBody);//actualiza (UPDATE) el documento en la colección "Users"
                                              //  que tiene el id proporcionado,
                                              // con los datos proporcionados en el body.
        res.send("Se actualizó un usuario");
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//----------------------DELETE USUARIO MEDIANTE ID--------------------------------------------------
//Define una ruta HTTP DELETE que acepta una solicitud para un usuario específico. 
//el :id en la ruta es un parámetro que se captura para identificar
// qué usuario debe ser eliminado.
usersRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;//extrae el parámetro id de la solicitud. 
                                  //Este id se refiere al identificador.
                                  // único del usuario que se desea eliminar.

        const collection = db.collection("Users");
        await collection.doc(id).delete();
        res.send("Se eliminó un usuario");
    } catch (error) {
        res.status(500).send(error.message);
    }});

module.exports = usersRouter;

