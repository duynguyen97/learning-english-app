const jwt = require("jsonwebtoken");
const { JWT_EXPIRES_TIME } = require("../constant");

const generateToken = async (
  payload,
  secretSignature,
  tokenLife = JWT_EXPIRES_TIME
) => {
  return await jwt.sign(payload, secretSignature, {
    expiresIn: tokenLife,
    algorithm: "HS256",
  });
};

module.exports = {
  generateToken,
};
