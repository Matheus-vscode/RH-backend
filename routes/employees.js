// backend/routes/employees.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Listar todos os funcionários
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Adicionar um funcionário
router.post("/", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  if (!name || !cpf || !role || !dept || !salary || !adm) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO employees (name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?)",
      [name, cpf, role, dept, salary, adm]
    );
    res.status(201).json({ id: result.insertId, name, cpf, role, dept, salary, adm });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deletar funcionário
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM employees WHERE id = ?", [req.params.id]);
    res.json({ message: "Funcionário removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar funcionário
router.put("/:id", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  try {
    await pool.query(
      "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
      [name, cpf, role, dept, salary, adm, req.params.id]
    );
    res.json({ message: "Funcionário atualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
