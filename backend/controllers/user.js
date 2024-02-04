const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createError(401, "All fields are required"));
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User is not existed"));
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) return next(createError(404, "Wrong Password"));
    // const payload = {
    //   userName: user.userName,
    //   email: user.email,
    //   _id: user._id,
    // };
    // const token = jwt.sign(payload, process.env.JWT);
    res
      .status(200)
      .json({
        message: "User is logged in.",
        userName: user.userName,
      });
  } catch (error) {
    next(error);
  }
};

const userRegister = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email  || !password) {
      return next(createError(401, "All fields are required"));
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return next(createError(400, "User is already existed"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    // const payload = {
    //   userName: newUser.userName,
    //   email: newUser.email,
    //   _id: newUser._id,
    // };
    // const token = jwt.sign(payload, process.env.JWT);

    res
      .status(200)
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "None",
        // expire: new Date() * 24 * 60 * 60 * 1000,
    //   })
      .json({
        message: "User has been created.",
        userName: newUser.userName,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  userRegister,
};