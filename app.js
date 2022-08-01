require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(router);

module.exports = app;
