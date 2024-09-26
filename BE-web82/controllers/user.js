const userModel = require("../models/user");
const constants = require("../utils/constants");
const config = require("dotenv").config({ path: ".env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

exports.register = async () => {
  const defaultUserName =
    process.env.DEFAULT_USERNAME === undefined
      ? constants.DEFAULT_USERNAME
      : process.env.DEFAULT_USERNAME;
  const defaultPassword =
    process.env.DEFAULT_PASSWORD === undefined
      ? constants.DEFAULT_PASSWORD
      : process.env.DEFAULT_PASSWORD;

  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(defaultPassword, salt);
  const defaultUser = {
    userName: defaultUserName,
    password: hashPassword,
  };
  const isExistDefaultUser = await userModel
    .findOne({ userName: defaultUserName })
    .exec();
  if (!isExistDefaultUser) {
    await userModel.create(defaultUser);
    return true;
  } else {
    return false;
  }
};

exports.loginUser = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const userFromDB = await userModel.findOne({ userName: userName }).exec();
  const isCorrectPassword = userFromDB
    ? bcrypt.compareSync(password, userFromDB.password)
    : false;
  if (userFromDB && isCorrectPassword) {
    const accessTokenSecret = process.env.ACCESSS_TOKEN_SECERT_KEY;
    const accessToken = jwt.sign({ id: userFromDB.id }, accessTokenSecret, {
      expiresIn: "2h",
    });
    req.session.isLogin = true;
    res.status(200).send({
      message: "Đăng nhập thành công",
      accessToken: accessToken,
    });
  } else {
    res.status(400).send({
      message: "Đăng nhập thất bại. Tên người dùng hoặc mật khẩu sai",
    });
  }
};

exports.logoutUser = (req, res) => {
  if (req.session.isLogin === true) {
    req.session.destroy();
    res.status(200).send({
      message: "Đăng xuất thành công.",
    });
  } else {
    res.status(400).send({
      message: "Người dùng đã đăng xuất.",
    });
  }
};
