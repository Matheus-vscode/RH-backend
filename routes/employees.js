// routes/employees.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Listar todos os funcionários
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Cadastrar funcionário
router.post("/", (req, res) => {
  const { name, email, position, department, salary, payroll, benefits } = req.body;
  const sql = `
    INSERT INTO employees (name, email, position, department, salary, payroll, benefits)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, email, position, department, salary, payroll, benefits], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, message: "Funcionário cadastrado!" });
  });
});

// Atualizar funcionário
router.put("/:id", (req, res) => {
  const { name, email, position, department, salary, payroll, benefits } = req.body;
  const sql = `
    UPDATE employees
    SET name=?, email=?, position=?, department=?, salary=?, payroll=?, benefits=?
    WHERE id=?
  `;
  db.query(sql, [name, email, position, department, salary, payroll, benefits, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Funcionário atualizado!" });
  });
});

// Deletar funcionário
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM employees WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Funcionário removido!" });
  });
});

module.exports = router;
