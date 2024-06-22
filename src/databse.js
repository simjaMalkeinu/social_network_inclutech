const mongoose = require("mongoose");

const { database } = require("./keys");

mongoose
  .connect(database.URI )
  .then((db) => console.log("db is connected"))
  .catch((e) => console.log(e));
