const { AuthToken } = require("../models/index");

const isValidToken = async (token) => {
  try {
    return await AuthToken.findOne({ token }, { _id: 1 });
  } catch (err) {
    return false;
  }
};

module.exports = {
  isValidToken,
};
