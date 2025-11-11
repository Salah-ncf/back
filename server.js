const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let requestCount = 0;


app.use((req, res, next) => {
  requestCount++;
  next();
});


setInterval(() => {
  console.log(`🕒 ${requestCount} requêtes reçues cette minute`);
  requestCount = 0;
}, 60000);


app.use("/images", express.static("public/images"));

const bouquets = [
  { id: 1, nom: "Bouquet de Tunis", descr: "...", image: "/images/bouquetTunis.jpg", prix: 1500 },
  { id: 2, nom: "Bouquet d’Alger", descr: "...", image: "/images/bouquetAlger.jpg", prix: 2000 },
  { id: 3, nom: "Bouquet d’Oran", descr: "...", image: "/images/bouquetOran.jpg", prix: 2000 }
];

let likesData = { 1: 0, 2: 0, 3: 0 };

app.get("/api/bouquets", (req, res) => res.json(bouquets));

app.get("/api/bouquets/:id", (req, res) => {
  const bouquet = bouquets.find(b => b.id === parseInt(req.params.id));
  res.json(bouquet);
});

app.get("/api/bouquets/:id/like", (req, res) =>
  res.json({ likes: likesData[req.params.id] || 0 })
);

app.put("/api/bouquets/:id/like", (req, res) => {
  const id = parseInt(req.params.id);
  const { action } = req.body;

  if (action === "like") likesData[id]++;
  if (action === "unlike" && likesData[id] > 0) likesData[id]--;

  console.log(`(${action}) bouquet ${id} → ${likesData[id]} likes`);
  res.json({ likes: likesData[id] });
});



app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
