const wordApi = require("express").Router();
const wordController = require("../controllers/word.controller");
const { jwtAuthentication } = require("../middlewares/passport.middleware");

wordApi.post("/add-word", jwtAuthentication, wordController.postWord);
wordApi.get("/exist", jwtAuthentication, wordController.getCheckWordExistence);

module.exports = wordApi;
