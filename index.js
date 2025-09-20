// index.js
const express = require("express");
const cors = require("cors");

const employeesRoutes = require("./routes/employees");
const awayRoutes = require("./routes/away");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/employees", employeesRoutes);
app.use("/away", awayRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
