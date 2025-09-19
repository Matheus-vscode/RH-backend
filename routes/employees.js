import express from "express";
import { db } from "../db.js";

const router = express.Router();

// listar
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM employees");
  res.json(rows);
});

// criar
router.post("/", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  const [result] = await db.query(
    "INSERT INTO employees (name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?)",
    [name, cpf, role, dept, salary, adm]
  );
  res.json({ id: result.insertId, name, cpf, role, dept, salary, adm });
});

// atualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;
  await db.query(
    "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
    [name, cpf, role, dept, salary, adm, id]
  );
  res.json({ id, name, cpf, role, dept, salary, adm });
});

// deletar
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM employees WHERE id=?", [id]);
  res.json({ success: true });
});

export default router;
