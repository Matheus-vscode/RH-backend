import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1012Matheus2007", // coloque sua senha do MySQL
  database: "rh"
});

// ================== Employees ==================
app.get("/employees", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM employees");
  res.json(rows);
});

app.post("/employees", async (req, res) => {
  const { id, name, cpf, role, dept, salary, adm } = req.body;
  await db.query(
    "INSERT INTO employees (id, name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, name, cpf, role, dept, salary, adm]
  );
  res.json({ message: "Funcionário cadastrado!" });
});

app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;
  await db.query(
    "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
    [name, cpf, role, dept, salary, adm, id]
  );
  res.json({ message: "Funcionário atualizado!" });
});

app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM employees WHERE id=?", [id]);
  res.json({ message: "Funcionário removido!" });
});

// ================== Away ==================
app.get("/away", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM away");
  res.json(rows);
});

app.post("/away", async (req, res) => {
  const { id, empId, fromDate, toDate, reason } = req.body;
  await db.query(
    "INSERT INTO away (id, empId, fromDate, toDate, reason) VALUES (?, ?, ?, ?, ?)",
    [id, empId, fromDate, toDate, reason]
  );
  res.json({ message: "Afastamento registrado!" });
});

app.delete("/away/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM away WHERE id=?", [id]);
  res.json({ message: "Afastamento removido!" });
});

// ================== Start server ==================
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));

