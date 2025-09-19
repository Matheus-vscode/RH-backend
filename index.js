import express from "express";
import cors from "cors";
import crypto from "crypto"; // para gerar IDs únicos

import employeesRoutes from "./routes/employees.js";
import awayRoutes from "./routes/away.js";

const app = express();
app.use(cors());
app.use(express.json());

// ================== Rotas ==================

// Aqui vamos sobrescrever a rota POST de employees para gerar ID
app.use("/employees", (req, res, next) => {
  if (req.method === "POST") {
    req.body.id = crypto.randomUUID(); // gera ID único no backend
  }
  next();
}, employeesRoutes);

app.use("/away", awayRoutes);

// ================== Iniciar servidor ==================
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
