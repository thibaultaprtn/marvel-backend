const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require("axios");

// Route pour obtenir les informations relatives à un charactère en particulier

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/character/${req.params.id}`,
      {
        params: {
          apiKey: process.env.API_KEY,
        },
      }
    );
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

module.exports = router;
