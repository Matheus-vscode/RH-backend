const express = require("express");
const cors = require("cors");
const employeesRouter = require("./routes/employees");
const awayRouter = require("./routes/away");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/employees", employeesRouter);
app.use("/employees/away", awayRouter);

// Teste
app.get("/", (req, res) => res.json({ status: "Backend rodando!" }));

app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));
