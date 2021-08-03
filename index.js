const express = require("express");
const routes = require("./src/routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// crear el servidor
const app = express();

//carpeta publica
app.use(express.static("src/uploads"));

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    // console.log(origin);
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

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

// Iniciar App
app.listen(port, host, () => {
  console.log("El servidor esta funcionando");
});
