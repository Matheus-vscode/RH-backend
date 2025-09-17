const express = require("express");
const router = express.Router();
const pool = require("../db");

// Listar afastamentos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM away");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar afastamento
router.post("/", async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO away (employeeId, startDate, endDate, reason) VALUES (?, ?, ?, ?)",
      [employeeId, startDate, endDate, reason]
    );
    res.status(201).json({ id: result.insertId, employeeId, startDate, endDate, reason });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remover afastamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM away WHERE id=?", [id]);
    res.json({ message: "Afastamento removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
