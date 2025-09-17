const express = require("express");
const router = express.Router();
const pool = require("../db");

// =================== CRUD Funcionários ===================

// Listar todos os funcionários
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo funcionário
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

// Deletar funcionário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM employees WHERE id=?", [id]);
    res.json({ message: "Funcionário removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =================== Afastamentos (Away) ===================

// Listar todos os afastamentos
router.get("/away", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM away");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Registrar afastamento
router.post("/away", async (req, res) => {
  const { employee_id, start_date, end_date, reason } = req.body;
  if (!employee_id || !start_date || !reason) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO away (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
      [employee_id, start_date, end_date || null, reason]
    );
    res.status(201).json({ id: result.insertId, employee_id, start_date, end_date, reason });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
