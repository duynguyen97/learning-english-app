const { uploadImage } = require("../services/common.service");
const {
  isExistWord,
  createNewWord,
  getWordPack: serviceGetWordPack,
} = require("../services/word.service");

exports.postWord = async (req, res) => {
  try {
    const { picture, word, type, ...rest } = req.body;
    const { accountId } = req.user;

    // check existence of word
    const isExist = await isExistWord(word, type, accountId);
    if (isExist) {
      return res
        .status(409)
        .json({ message: `Từ "${word} (${type})" đã tồn tại trong từ điển` });
    }

    // upload description picture if available
    let pictureUrl = null;
    if (picture) {
      pictureUrl = await uploadImage(picture, "dev/words");
    }

    // create the new word
    const isCreateSuccess = await createNewWord({
      word,
      type,
      picture: pictureUrl,
      isChecked: false,
      ...rest,
    });

    if (isCreateSuccess) {
      return res.status(200).json({ message: "Tạo từ mới thành công" });
    }
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  } catch (error) {
    console.error("POST WORD ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

exports.getCheckWordExistence = async (req, res) => {
  try {
    const { word, type } = req.query;
    const { accountId } = req.user;

    const isExist = await isExistWord(word, type, accountId);
    return res.status(200).json({ isExist });
  } catch (error) {
    console.error("GET CHECK WORD EXIST ERROR: ", error);
    return res.status(200).json({ isExist: false });
  }
};

exports.getWordPack = async (req, res, next) => {
  try {
    const { page, perPage, packInfo } = req.query;
    const { accountId } = req.user;

    const pageInt = parseInt(page),
      perPageInt = parseInt(perPage);
    const skip = (pageInt - 1) * perPageInt;

    const packList = await serviceGetWordPack(
      accountId,
      JSON.parse(packInfo),
      skip,
      perPageInt,
      { $and: [{ picture: { $ne: null } }, { picture: { $ne: "" } }] }
    );

    return res.status(200).json({ packList });
  } catch (error) {
    console.error("GET WORD PACK ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};
