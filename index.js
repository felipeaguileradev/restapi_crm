const express = require("express");
const routes = require("./src/routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/crm_restapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// definir un dominio(s) para recibir las peticiones
const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    //  revisar si la peticion viene de un servidor que esta en whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

// habilitar cors
app.use(cors(corsOptions));

// Rutas de la app
app.use("/", routes());

//carpeta publica
app.use(express.static("src/uploads"));

// Puerto
app.listen(5000, () => {
  console.log("servidor escuchando en el puerto 5000");
});
