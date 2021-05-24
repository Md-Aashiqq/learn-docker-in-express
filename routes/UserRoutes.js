const express = require("express");
const UserControllers = require("../controllers/UserControllers");

const Userouter = express.Router();

Userouter.route("/signin").post(UserControllers.userSignUp);
Userouter.route("/login").post(UserControllers.login);

module.exports = Userouter;
