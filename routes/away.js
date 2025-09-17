// backend/routes/away.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Listar todos os afastamentos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM away");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Registrar afastamento
router.post("/", async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  if (!employeeId || !startDate || !reason) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
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

// Remover afastamento
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM away WHERE id = ?", [req.params.id]);
    res.json({ message: "Afastamento removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
