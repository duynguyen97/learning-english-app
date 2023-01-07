const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// set environment variables
require("dotenv").config();
// ================== Connect mongodb with mongoose ==================
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected at port 27017");
});

// ================== config ==================
app.use(logger("dev"));
app.use(cookieParser());

// ================== Listening ... ==================
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
