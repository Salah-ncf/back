
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const bouquets = [
  {
    id: 1,
    nom: "Bouquet de Tunis",
    descr: "Un dosage parfait de jasmins et de tulipes, du soleil toute l’année chez vous.",
    image: "/images/bouquetTunis.jpg",
    prix: 1500,
  },
  {
    id: 2,
    nom: "Bouquet d’Alger",
    descr: "Un mélange de jasmins et de senteurs méditerranéennes pour égayer votre bureau.",
    image: "/images/bouquetAlger.jpg",
    prix: 2000,
  },
  {
    id: 3,
    nom: "Bouquet d’Oran",
    descr: "Un mélange merveilleux de roses et de lys, aux odeurs éclatantes.",
    image: "/images/bouquetOran.jpg",
    prix: 2000,
  },
];


app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Fleur&Vie ");
});


app.get("/api/bouquets", (req, res) => {
  res.json(bouquets);
});


app.listen(PORT, () => {
  console.log(` Serveur Express démarré sur http://localhost:${PORT}`);
});
