const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username must be"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password must be unqie"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
