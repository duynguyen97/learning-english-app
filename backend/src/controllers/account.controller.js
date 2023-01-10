const { createUsername } = require("../helper");
const {
  isExistAccount,
  createAccount,
  createUser,
} = require("../services/account.service");
const { ACCOUNT_TYPES } = require("../constant");

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
