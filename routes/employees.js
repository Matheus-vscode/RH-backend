import express from "express";
import { db } from "../db.js";
import { randomUUID } from "crypto";

const router = express.Router();

// Listar todos os funcionários
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM employees");
  res.json(rows);
});

// Criar funcionário
router.post("/", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  const id = randomUUID();
  await db.query(
    "INSERT INTO employees (id, name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, name, cpf, role, dept, salary, adm]
  );
  res.json({ id, name, cpf, role, dept, salary, adm });
});

// Atualizar funcionário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;
  await db.query(
    "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
    [name, cpf, role, dept, salary, adm, id]
  );
  res.json({ id, name, cpf, role, dept, salary, adm });
});

// Remover funcionário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM employees WHERE id=?", [id]);
  // Remover afastamentos também
  await db.query("DELETE FROM away WHERE empId=?", [id]);
  res.json({ success: true });
});

export default router;

