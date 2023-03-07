const accountApi = require("express").Router();
const accountController = require("../controllers/account.controller");
const passportConfig = require("../middlewares/passport.middleware");

accountApi.post("/register", accountController.postRegisterAccount);
accountApi.post("/login", accountController.postLogin);
accountApi.post("/logout", accountController.postLogout);
accountApi.get(
  "/user-profile",
  passportConfig.jwtAuthentication,
  accountController.getUserProfile
);
accountApi.put(
  "/update-profile",
  passportConfig.jwtAuthentication,
  accountController.putUpdateProfile
);
accountApi.get(
  "/user-info",
  passportConfig.jwtAuthentication,
  accountController.getUserInfo
);
accountApi.put(
  "/update-avt",
  passportConfig.jwtAuthentication,
  accountController.putUpdateAvt
);

module.exports = accountApi;
