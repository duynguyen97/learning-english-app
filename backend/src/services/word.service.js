const { convertPackInfoToQueryStr } = require("../helper");
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

exports.getWordPack = async (
  accountId,
  packInfo = {},
  skip = 0,
  limit = 500
) => {
  try {
    let query = convertPackInfoToQueryStr(packInfo);

    const [packList] = await WordModel.aggregate([
      {
        $match: { accountId, ...query },
      },
      {
        $facet: {
          data: [{ $match: query }, { $skip: skip }, { $limit: limit }],
          pagination: [{ $count: "total" }],
        },
      },
    ]);

    return packList;
  } catch (error) {
    throw error;
  }
};
