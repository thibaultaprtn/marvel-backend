const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require("axios");

router.get("", async (req, res) => {
  try {
    console.log("trig");
    // Avec postman, quand on met des Params dans la requête en get, on les récupère dans req.query
    // TODO Définir les constantes name/limit/skip en dehors de const response et les appeler dans les params
    const name = req.query.name || "";
    const limit = req.query.limit || 100;
    const skip = req.query.page ? (req.query.page - 1) * limit : 0;
    // console.log("page dans le back", req.query.page, "skip dans le back", skip);
    const response = await axios.get(`${process.env.API_URL}/characters`, {
      params: {
        apiKey: process.env.API_KEY,
        // On récupère déjà tous les characters
        // La syntaxe ci dessous fonctionne correctement il suffit de déterminer depuis le front si on transmet les valeurs de name et page via des params, des query ou un body
        name: name,
        limit: limit,
        skip: skip,
      },
    });
    //TODO Il faut trier les données de retour par ordre alphabétique en tenant compte des caractères numériques en fin de titre
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
