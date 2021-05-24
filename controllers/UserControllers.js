const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.userSignUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashpassword,
    });

    req.session.user = user;
    res.status(201).json({
      status: "sucess",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({
        status: "fails",
        msg: "User Not found",
      });
    }

    const isCorrectPass = bcrypt.compare(password, user.password);

    if (isCorrectPass) {
      req.session.user = user;
      res.status(200).json({
        status: "sucess",
        msg: "Login Status",
        data: {
          user,
        },
      });
    } else {
      res.status(401).json({
        status: "fails",
        msg: "passWord wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fails",
    });
  }
};
