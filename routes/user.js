const User = require("../models/User");

const express = require("express");
const router = express.Router();
const signUp = require("../utilitaryFunctions/signUp");
const login = require("../utilitaryFunctions/login");
const update = require("../utilitaryFunctions/update");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.use(express.json());
const axios = require("axios");

//renvoie un objet avec deux clefs characters et comics qui correspondent aux tableaux avec les id des characters/comics correspondant
//TODO Rajouter les isAuthenticated dans les routes en get
router.get("/favoritesid/:id", async (req, res) => {
  try {
    // console.log("req.params.id", req.params.id);
    const response = await User.findById(req.params.id);
    // console.log(response.favorites);
    res.status(200).json(response.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/favoritestab/:id", async (req, res) => {
  try {
    const response = await User.findById(req.params.id);
    let tabcharacters = [];
    for (let i = 0; i < response.favorites.characters.length; i++) {
      const tab = await axios.get(
        `${process.env.API_URL}/character/${response.favorites.characters[i]}`,
        {
          params: {
            apiKey: process.env.API_KEY,
          },
        }
      );
      console.log("tab.data", tab.data);
      tabcharacters.push(tab.data);
    }

    let tabcomics = [];
    for (let i = 0; i < response.favorites.comics.length; i++) {
      const tab = await axios.get(
        `${process.env.API_URL}/comic/${response.favorites.comics[i]}`,
        {
          params: {
            apiKey: process.env.API_KEY,
          },
        }
      );
      tabcomics.push(tab.data);
    }
    const tabfinal = { characters: tabcharacters, comics: tabcomics };
    console.log(tabfinal);
    res.status(200).json(tabfinal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/favoritestablocal", async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signup", signUp, async (req, res) => {
  console.log(
    `Le profil de l'utilisateur ${req.body.username} a bien été crée`
  );
  res.status(201).json({
    _id: req.body._id,
    token: req.body.token,
    username: req.body.username,
  });
});

router.post("/login", login);

// TODO il faudrait rajouter un middleware isAuthorized qui vérifie que le token et l'id sont bien assocés

router.put("/update/:id", isAuthenticated, update, (req, res) => {
  res.status(200).json({ message: "Le profil a bien été mis à jour" });
});

module.exports = router;
