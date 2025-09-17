const express = require("express");
const router = express.Router();
const pool = require("../db");

// ================== FUNCIONÁRIOS ==================

// Listar todos os funcionários
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar novo funcionário
router.post("/", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  if (!name) return res.status(400).json({ message: "Nome obrigatório" });

  try {
    const [result] = await pool.query(
      "INSERT INTO employees (name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?)",
      [name, cpf, role, dept, salary, adm]
    );
    const [newEmp] = await pool.query("SELECT * FROM employees WHERE id = ?", [result.insertId]);
    res.status(201).json(newEmp[0]);
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
    const [updated] = await pool.query("SELECT * FROM employees WHERE id=?", [id]);
    res.json(updated[0]);
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

// ================== AFASTAMENTOS ==================

// Listar afastamentos
router.get("/away", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM away");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar afastamento
router.post("/away", async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  if (!employeeId || !startDate || !reason) return res.status(400).json({ message: "Campos obrigatórios" });

  try {
    const [result] = await pool.query(
      "INSERT INTO away (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
      [employeeId, startDate, endDate, reason]
    );
    const [newAway] = await pool.query("SELECT * FROM away WHERE id=?", [result.insertId]);
    res.status(201).json(newAway[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remover afastamento
router.delete("/away/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM away WHERE id=?", [id]);
    res.json({ message: "Afastamento removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
