const { ACCOUNT_TYPES } = require("../constant");
const AccountModel = require("../models/account.model/account.model");
const UserModel = require("../models/account.model/user.model");

exports.isExistAccount = async (email) => {
  try {
    return await AccountModel.exists({ email });
  } catch (error) {
    throw error;
  }
};

exports.findAccount = async (email) => {
  try {
    return await AccountModel.findOne({ email });
  } catch (error) {
    throw error;
  }
};

exports.createAccount = async (
  email,
  password,
  authType = ACCOUNT_TYPES.LOCAL
) => {
  try {
    const newAccount = await AccountModel.create({
      email,
      password,
      authType,
      createdDate: new Date(),
    });
    if (newAccount && newAccount._id) return newAccount._id;
    return null;
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (accountId, username, name, avt = "") => {
  try {
    const newUser = await UserModel.create({ accountId, name, username, avt });
    if (newUser && newUser._id) return newUser;
    return null;
  } catch (error) {
    throw error;
  }
};

exports.getProfile = async (accountId = "") => {
  try {
    const account = await AccountModel.findById(accountId).select(
      "email createdDate"
    );
    return account;
  } catch (error) {
    throw error;
  }
};
