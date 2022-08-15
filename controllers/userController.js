const { User, AuthToken } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getErrorContent } = require("../helpers/commonHelper");

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      throw getErrorContent(400, "INCOMPLETE_ARGUMENTS", 'Email-Id and Password');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email }, { userType: 0, __v: 0 });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw getErrorContent(401, "INVALID_CREDENTIALS");
      }
      // Create token
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRY || "2d",
        }
      );

      await AuthToken.create({
        userId: user._id,
        token,
      });

      const result = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive,
        token: token
      };
      return res.status(200).json(result);
    }
    throw getErrorContent(401, "INVALID_CREDENTIALS");
  } catch (err) {
    throw err;
  }
};

const register = async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName)) {
      throw getErrorContent(400, "INCOMPLETE_ARGUMENTS", 'Email-Id, Password and First Name');
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw getErrorContent(409, "ALREADY_EXISTS", email);
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase().trim(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY || "2d" }
    );

    await AuthToken.create({
      userId: user._id,
      token,
    });

    const result = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
      token: token
    };

    return res.status(201).json(result);
  } catch (err) {
    throw err;
  }
};

const userDetails = async (req, res) => {
  try {
    const { userId } = { ...req.user };
    if (userId) {
      const user = await User.findById(userId, { password: 0, userType: 0, __v: 0 });
      return res.status(200).json(user);
    }
    return res.status(200).json({ success: true, message: '', data: null });
  } catch (err) {
    res.status(500).send({ success: false, message: "Internal Server Error!" });
  }
};

const logout = async (req, res) => {
  try {
    // Delete user Token from DB
    await AuthToken.deleteOne({ token: req.user.token });
    return res.status(200).send({ success: true, message: "Logged Out Successfully!" });
  } catch (err) {
    throw getErrorContent(500, "SERVER_ERROR");
  }
};

module.exports = {
  login,
  register,
  logout,
  userDetails
};
