const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errors } = require("celebrate");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

const dirApp = path.join(__dirname, "../../frontend/build");

app.use(express.static(dirApp));
app.get("/", (_, res) => res.sendFile(path.join(dirApp, "index.html")));
app.use(routes);
app.use(errors());

module.exports = app;
