const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require("axios");

//Route pour obtenir tous les comics en fonctions des paramètres que l'on rentre (name, limit, skip)

router.get("", async (req, res) => {
  try {
    console.log("trig");
    //Les paramètres d'entrée sont req.query.name et req.query.page
    // Avec postman, quand on met des Params dans la requête en get, on les récupère dans req.query
    // TODO Définir les constantes name/limit/skip en dehors de const response et les appeler dans les params
    const title = req.query.title || "";
    const limit = req.query.limit || 100;
    const skip = req.query.page ? (req.query.page - 1) * limit : 0;

    const response = await axios.get(`${process.env.API_URL}/comics`, {
      params: {
        apiKey: process.env.API_KEY,
        // On récupère déjà tous les comics
        // La syntaxe ci dessous fonctionne correctement il suffit de déterminer depuis le front si on transmet les valeurs de name et page via des params, des query ou un body
        title: title,
        limit: limit,
        skip: skip,
      },
    });
    // console.log(response.data);
    //TODO Il faut trier les données de retour par ordre alphabétique en tenant compte des caractères numériques en fin de titre
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Route pour obtenir l'ensemble des comics relatifs à l'id d'un character

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/comics/${req.params.id}`,
      {
        params: {
          apiKey: process.env.API_KEY,
        },
      }
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
