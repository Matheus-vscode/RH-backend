import express from "express";
import cors from "cors";

import employeesRoutes from "./routes/employees.js";
import awayRoutes from "./routes/away.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/employees", employeesRoutes);
app.use("/away", awayRoutes);

// Iniciar servidor
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
