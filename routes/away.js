const express = require("express");
const router = express.Router();
const pool = require("../db");

// Listar todos os afastamentos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM away");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cadastrar afastamento
router.post("/", async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO away (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
      [employeeId, startDate, endDate, reason]
    );
    res.status(201).json({ id: result.insertId, employeeId, startDate, endDate, reason });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover afastamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM away WHERE id=?", [id]);
    res.json({ message: "Afastamento removido" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
