import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

// ================== Conexão com MySQL ==================
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",      // coloque seu usuário do MySQL
  password: "1012Matheus2007",      // coloque sua senha do MySQL
  database: "rh"     // crie um banco chamado 'rh'
});
console.log("✅ Conectado ao MySQL");

// ================== Rotas de Funcionários ==================

// Buscar todos funcionários
app.get("/employees", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM employees");
  res.json(rows);
});

// Adicionar funcionário
app.post("/employees", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  await db.query(
    "INSERT INTO employees (name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?)",
    [name, cpf, role, dept, salary, adm]
  );
  const [rows] = await db.query("SELECT * FROM employees");
  res.json(rows);
});

// Editar funcionário
app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;
  await db.query(
    "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
    [name, cpf, role, dept, salary, adm, id]
  );
  const [rows] = await db.query("SELECT * FROM employees");
  res.json(rows);
});

// Remover funcionário
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM employees WHERE id=?", [id]);
  await db.query("DELETE FROM away WHERE empId=?", [id]);
  const [rows] = await db.query("SELECT * FROM employees");
  res.json(rows);
});

// ================== Rotas de Afastamentos ==================

// Buscar afastamentos
app.get("/away", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM away");
  res.json(rows);
});

// Adicionar afastamento
app.post("/away", async (req, res) => {
  const { empId, fromDate, toDate, reason } = req.body;
  await db.query(
    "INSERT INTO away (empId, fromDate, toDate, reason) VALUES (?, ?, ?, ?)",
    [empId, fromDate, toDate || null, reason]
  );
  const [rows] = await db.query("SELECT * FROM away");
  res.json(rows);
});

// Remover afastamento
app.delete("/away/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM away WHERE id=?", [id]);
  const [rows] = await db.query("SELECT * FROM away");
  res.json(rows);
});

// ================== Servidor ==================
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Backend rodando em http://localhost:${PORT}`));
