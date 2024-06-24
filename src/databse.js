const mongoose = require("mongoose");

const { database } = require("./keys");

mongoose
  .connect(database.URI)
  .then((db) => console.log("Conectado a MongoDB Atlas"))
  .catch((e) => console.log("Error al conectarse a MongoDB Atlas", e));
