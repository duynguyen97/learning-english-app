const UserModel = require("../models/account.model/user.model");
const jwt = require("jsonwebtoken");
const { KEYS } = require("../constant");
require("dotenv").config();

// Authentication with JWT
exports.jwtAuthentication = async (req, res, next) => {
  try {
    res.locals.isAuth = false;
    let token = req.cookies ? req.cookies[KEYS.JWT_TOKEN] : null;

    // if not exist cookie[access_token] -> isAuth = false -> next
    if (!token) {
      next();
      return;
    }
    // verify jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      const { accountId } = decoded;
      let user = await UserModel.findOne({ accountId }).select(
        "-_id username name avt favoriteList"
      );

      if (user) {
        user.accountId = accountId;
        res.locals.isAuth = true;
        req.user = user;
      }
    }
    next();
  } catch (error) {
    console.error("Authentication with JWT ERROR: ", error);
    return res.status(401).json({
      message: "Unauthorized.",
      error,
    });
  }
};
