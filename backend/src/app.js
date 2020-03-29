const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const path = require("path");
const container = require("static-vars");

const app = express();

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  transports: ["websocket"]
});

container.set("socketio", io);

app.use(cors());
app.use(express.json());

const dirApp = path.join(__dirname, "../../frontend/build");

app.use(express.static(dirApp));
app.get("/", (_, res) => res.sendFile(path.join(dirApp, "index.html")));

const routes = require("./routes");
app.use(routes);

app.use(errors());

module.exports = server;
