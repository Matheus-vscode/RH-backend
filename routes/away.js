const express = require("express");
const router = express.Router();
const pool = require("../db");

// Criar afastamento
router.post("/", async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  if (!employeeId || !startDate || !reason) {
    return res.status(400).json({ message: "Campos obrigatórios faltando" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO away (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
      [employeeId, startDate, endDate || null, reason]
    );
    res.status(201).json({ id: result.insertId, employeeId, startDate, endDate, reason });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT a.id, a.employee_id, e.name, a.start_date, a.end_date, a.reason
      FROM away a
      LEFT JOIN employees e ON a.employee_id = e.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remover afastamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM away WHERE id=?", [id]);
    res.json({ message: "Afastamento removido", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
