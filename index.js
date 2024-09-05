//Utilisation des variables d'envrionnement
require("dotenv").config();

//Utilisation des packages
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

//Création du serveur
const app = express();

//Utilisation de middlewares globaux
app.use(cors());
app.use(express.json());

//Connexion à la database MongoDB
mongoose.connect(process.env.MONGODB_URI);

//Import des routeurs
const charactersRouter = require("./routes/characters");
const characterRouter = require("./routes/character");
const comicsRouter = require("./routes/comics");
const comicRouter = require("./routes/comic");
const userRouter = require("./routes/user");

//Utilisation des routeurs
app.use("/characters", charactersRouter);
app.use("/character", characterRouter);
app.use("/comics", comicsRouter);
app.use("/comic", comicRouter);
app.use("/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Server Started Successfully on port " + (process.env.PORT || 3000)
  );
});
