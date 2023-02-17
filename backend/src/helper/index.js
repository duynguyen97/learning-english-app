const bcrypt = require("bcryptjs");
const { MAX } = require("../constant");

// @fn: create an username for user by email, account id
// @ex: dyno2000@email.com, id: 127391212 => dyno200012739
exports.createUsername = (email = "", id = "") => {
  const idStr = id.toString();
  return (
    email.toString().split("@")[0] + idStr.slice(idStr.length - 5, idStr.length)
  );
};

exports.convertPackInfoToQueryStr = (packInfo) => {
  const { topics, ...restPackInfo } = packInfo;
  const topicList = typeof topics === "string" ? JSON.parse(topics) : topics;

  // generate query string
  let query = {};
  for (let key in restPackInfo) {
    if (packInfo[key] !== "-1") {
      query[key] = packInfo[key];
    }
  }

  // query multiple topic
  if (topicList.length > 0) {
    let orList = [];
    topicList.forEach((topic) =>
      orList.push({ topics: { $elemMatch: { $eq: topic } } })
    );
    query["$or"] = orList;
  }

  return query;
};
