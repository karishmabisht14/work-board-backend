const { User, AuthToken } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send({ success: false, message: "All input is required" });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email }, { userType: 0, __v: 0 });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send({ success: false, message: "Email Id or the Password is not correct!" });
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
    return res.status(401).send({ success: false, message: "Email Id or the Password is not correct!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Internal Server Error!" });
  }
};

const register = async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      return res.status(400).send({ success: false, message: "All input is required" });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({ success: false, message: "User Already Exist. Please Login" });
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
    console.log(err);
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
    console.log(err);
    res.status(500).send({ success: false, message: "Internal Server Error!" });
  }
};

const logout = async (req, res) => {
  try {
    // Delete user Token from DB
    await AuthToken.deleteOne({ token: req.user.token });
    return res.status(200).send({ success: true, message: "Logged Out Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Internal Server Error!" });
  }
};

module.exports = {
  login,
  register,
  logout,
  userDetails
};
