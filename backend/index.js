const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// import local file
const corsConfig = require("./src/configs/cors.config");
const accountApi = require("./src/apis/account.api");
const wordApi = require("./src/apis/word.api");

const app = express();

// set environment variables
require("dotenv").config();

// ================== setup ==================
app.use(express.static(path.join(__dirname, "/src/build")));

const dev = app.get("env") !== "production";

if (!dev) {
  app.disable("x-powered-by");
  app.use(morgan("common"));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/build", "index.html"));
  });

  // Auto wake up heroku
  // app.get('/apis/wakeup-heroku', (req, res) => res.send('ok'));
  // const timer = 25 * 60 * 1000; // 25 minutes
  // setInterval(() => {
  //   https.get('https://dynonary.herokuapp.com/apis/wakeup-heroku');
  // }, timer);
} else {
  app.use(morgan("dev"));
}

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
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ================== Listening ... ==================
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
// ================== Apis ==================
const BASE_URL = "/api";
app.use(`${BASE_URL}/account`, accountApi);
app.use(`${BASE_URL}/word`, wordApi);
