const express = require("express");
const http = require("http");
const {Server } = require("socket.io");

const config = require("./server/config");

require("./databse");

const exp = express()
require('./databse')
const server = http.createServer(exp);
const io = new Server(server)

const app = config(exp);


require("./server/sockets")(io);

server.listen(app.get("port"), () => {
  console.log("server on port ", app.get("port"));
});
