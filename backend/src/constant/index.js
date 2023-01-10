exports.ACCOUNT_TYPES = {
  LOCAL: "local",
  GOOGLE: "gg",
  FACEBOOK: "fb",
};

exports.COOKIE_EXPIRES_TIME = 7 * 24 * 3600 * 1000; // 7 days (by sec)

exports.JWT_EXPIRES_TIME = 7 * 24 * 3600 * 1000; // 7 days (by sec)

exports.KEYS = {
  JWT_TOKEN: "token",
};

exports.MAX = {
  SIZE_JSON_REQUEST: "25mb",
  EMAIL_LEN: 100,
  PASSWORD_LEN: 40,
  NAME_LEN: 50,
  USER_NAME: 110,
  VERIFY_CODE: 6,
  VERIFY_TIME: 10 * 60 * 1000, // 10 minutes
};

exports.MIN = {
  PASSWORD_LEN: 6,
  CONFUSING_LIST: 20,
};
