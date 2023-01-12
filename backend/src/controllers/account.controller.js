const { createUsername } = require("../helper");
const {
  isExistAccount,
  createAccount,
  createUser,
  findAccount,
  getProfile,
} = require("../services/account.service");
const bcrypt = require("bcryptjs");
const jwtConfig = require("../configs/jwt.config");
const { ACCOUNT_TYPES, KEYS, COOKIE_EXPIRES_TIME } = require("../constant");

exports.postRegisterAccount = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email?.toLowerCase();

    // check account existence
    const isExist = await isExistAccount(email);
    if (isExist) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // create an account
    const newAccountId = await createAccount(
      email,
      password,
      ACCOUNT_TYPES.LOCAL
    );
    if (!newAccountId) {
      return res
        .status(409)
        .json({ message: "Tạo tài khoản thất bại, thử lại" });
    }

    // create an user
    const username = createUsername(email, newAccountId);
    const newUser = await createUser(newAccountId, username, name);
    if (!newUser) {
      return res
        .status(409)
        .json({ message: "Tạo tài khoản thất bại, thử lại" });
    }

    return res.status(200).json({ message: "Tạo tài khoản thành công" });
  } catch (error) {
    console.error("POST REGISTER ACCOUNT ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const { password } = req.body;

    // check account existence
    const account = await findAccount(email);
    if (!account) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    // verify password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // set cookie with jwt
    const token = await jwtConfig.generateToken(
      { accountId: account._id },
      process.env.JWT_SECRET_KEY || "app-serect"
    );
    res.cookie(KEYS.JWT_TOKEN, token, {
      httpOnly: true,
      expires: new Date(Date.now() + COOKIE_EXPIRES_TIME),
    });

    return res.status(200).json({
      message: "success",
      key: KEYS.JWT_TOKEN,
      token,
      expires: new Date(Date.now() + COOKIE_EXPIRES_TIME),
    });
  } catch (error) {
    console.error("POST LOGIN ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

exports.postLogout = async (req, res) => {
  try {
    res.clearCookie(KEYS.JWT_TOKEN);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("POST LOG OUT ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: "failed" });
    }
    const { accountId } = req.user;

    const userInfo = await getProfile(accountId);
    if (!userInfo) {
      return res.status(403).json({ message: "failed" });
    }

    return res
      .status(200)
      .json({ email: userInfo.email, createdDate: userInfo.createdDate });
  } catch (error) {
    console.error("GET USER PROFILE ERROR: ", error);
    return res.status(500).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { isAuth = false } = res.locals;
    if (!isAuth) {
      return res.status(401).json({ message: "Failed" });
    }
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("GET USER INFO ERROR: ", error);
    return res.status(401).json({ message: "Failed" });
  }
};
