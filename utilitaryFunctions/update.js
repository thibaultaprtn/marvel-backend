const mongoose = require("mongoose");
const User = require("../models/User");

//La fonction update modifie les paramètres d'un utilisateur renseignés dans le body
const update = async (req, res, next) => {
  try {
    // console.log(req.body, req.params.id);
    console.log(req.body.tabtemp);
    let user = await User.findById(req.body.id);
    console.log("success", user.favorites[req.body.category]);
    user.favorites[req.body.category] = req.body.tabtemp;
    console.log(user);
    await user.save();
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = update;
