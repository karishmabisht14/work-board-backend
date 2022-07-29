const jwt = require("jsonwebtoken");
const { isValidToken } = require("../controllers/authTokenController");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .send("A valid token is required for authentication!");
  }
  try {
    if (await isValidToken(token)) {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
      req.user.token = token;
    } else {
      return res.status(401).send("Invalid / Expired Token!");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
