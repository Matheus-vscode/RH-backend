// backend/routes/employees.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// ======================
// Listar todos os funcionários
// ======================
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// Cadastrar novo funcionário
// ======================
router.post("/", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  if (!name || !cpf || !role) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO employees (name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?)",
      [name, cpf, role, dept || null, salary || null, adm || null]
    );
    res.status(201).json({ id: result.insertId, name, cpf, role, dept, salary, adm });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// Atualizar funcionário
// ======================
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;

  try {
    await pool.query(
      "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
      [name, cpf, role, dept || null, salary || null, adm || null, id]
    );
    res.json({ id, name, cpf, role, dept, salary, adm });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// Deletar funcionário
// ======================
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM employees WHERE id=?", [id]);
    // Apagar também todos os afastamentos do funcionário
    await pool.query("DELETE FROM away WHERE employee_id=?", [id]);
    res.json({ message: "Funcionário e afastamentos removidos com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// Registrar afastamento
// ======================
router.post("/away", async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  if (!employeeId || !startDate || !reason) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO away (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
      [employeeId, startDate, endDate || null, reason]
    );
    res.status(201).json({ id: result.insertId, employeeId, startDate, endDate, reason });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// Listar afastamentos
// ======================
router.get("/away", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT a.id, a.employee_id, a.start_date, a.end_date, a.reason, e.name FROM away a JOIN employees e ON a.employee_id = e.id"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// Deletar afastamento
// ======================
router.delete("/away/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM away WHERE id=?", [id]);
    res.json({ message: "Afastamento removido com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
