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

// habilitar cors
app.use(cors());

// Rutas de la app
app.use("/", routes());

//carpeta publica
app.use(express.static("src/uploads"));

// Puerto
app.listen(5000, () => {
  console.log("servidor escuchando en el puerto 5000");
});
