const { User, AuthToken } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    await bcrypt.compare(password, user.password);
    if (user) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRY || "2d",
        }
      );

      await AuthToken.create({
        userId: user.id,
        token,
      });

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const register = async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
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
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY || "2d" }
    );

    await AuthToken.create({
      userId: user.id,
      token,
    });
    // save user token
    user.token = token;
    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req, res) => {
  try {
    // Delete user Token from DB
    await AuthToken.deleteOne({ token: req.user.token });
    return res.status(200).send("Logged Out Successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  login,
  register,
  logout,
};
