const express = require("express");
const router = express.Router();
const signUp = require("../utilitaryFunctions/signUp");
const login = require("../utilitaryFunctions/login");
const update = require("../utilitaryFunctions/update");
const isAuthenticated = require("../middlewares/isAutenticated");
router.use(express.json());
const axios = require("axios");

router.post("/signup", signUp, async (req, res) => {
  console.log(req);
  res.status(201).json({
    _id: req.body._id,
    token: req.body.token,
    username: req.body.username,
  });
});

router.post("/login", login);

router.put("/update/:id", update, (req, res) => {
  res.status(200).json({ message: "Le profil a bien été mis à jour" });
});

module.exports = router;
