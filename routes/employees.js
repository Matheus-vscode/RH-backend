const express = require("express");
const router = express.Router();
const pool = require("../db");

// Listar funcionários
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar funcionário
router.post("/", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
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

// Editar funcionário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;
  try {
    await pool.query(
      "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
      [name, cpf, role, dept, salary, adm, id]
    );
    res.json({ id, name, cpf, role, dept, salary, adm });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remover funcionário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM employees WHERE id=?", [id]);
    res.json({ message: "Funcionário removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
