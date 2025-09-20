const express = require("express");
const cors = require("cors");
const employeesRoutes = require("./employees");
const awayRoutes = require("./away");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/employees", employeesRoutes);
app.use("/away", awayRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("🚀 API RH rodando...");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
