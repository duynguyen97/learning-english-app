const WordModel = require("../models/word.model");

exports.createNewWord = async (wordInfo) => {
  try {
    const newWord = await WordModel.create({ ...wordInfo });

    if (newWord) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

exports.isExistWord = async (word = "", type = "", accountId) => {
  try {
    if (!word || !type || !accountId) {
      return false;
    }

    return (
      (await WordModel.find({
        accountId: accountId,
        word: word,
        type: type,
      }).count()) > 0
    );
  } catch (error) {
    throw error;
  }
};
