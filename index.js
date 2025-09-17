const express = require("express");
const cors = require("cors");
const employeesRouter = require("./routes/employees");
const awayRouter = require("./routes/away");
const pool = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/employees", employeesRouter);
app.use("/away", awayRouter);

// Rota de teste
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1+1 AS result");
    res.json({ status: "Backend rodando!", db: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Backend rodando na porta ${PORT}`);
});
