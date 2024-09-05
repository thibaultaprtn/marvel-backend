const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  newsletter: Boolean,
  token: String,
  hash: String,
  salt: String,
  favorites: { characters: Array, comics: Array },
});

module.exports = User;
