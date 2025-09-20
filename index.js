const express = require("express");
const cors = require("cors");

const employeesRoutes = require("./employees");
const awayRoutes = require("./away");
const payrollRoutes = require("./payroll");
const benefitsRoutes = require("./benefits");
const cipaRoutes = require("./cipa");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/employees", employeesRoutes);
app.use("/away", awayRoutes);
app.use("/payroll", payrollRoutes);
app.use("/benefits", benefitsRoutes);
app.use("/cipa", cipaRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("🚀 API RH rodando com Funcionários, Afastamentos, Folha, Benefícios e CIPA");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
