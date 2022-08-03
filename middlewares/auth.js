const jwt = require("jsonwebtoken");
const { isValidToken } = require("../controllers/authTokenController");
const { getErrorContent } = require("../helpers/commonHelper");

const config = process.env;

const verifyToken = async (req, res) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization;
  if (!token) {
    throw getErrorContent(403, "AUTHORIZATION_REQUIRED");
  }
  try {
    if (await isValidToken(token)) {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
      req.user.token = token;
    } else {
      throw getErrorContent(401, "INVALID_TOKEN");
    }
  } catch (err) {
    throw getErrorContent(401, "INVALID_TOKEN");
  }
  return;
};

module.exports = verifyToken;
