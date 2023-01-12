const wordApi = require("express").Router();
const wordController = require("../controllers/word.controller");
const { jwtAuthentication } = require("../middlewares/passport.middleware");

wordApi.post("/add-word", jwtAuthentication, wordController.postWord);

module.exports = wordApi;
