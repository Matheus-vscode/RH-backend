const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET afastamentos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM away");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST novo afastamento
router.post("/", async (req, res) => {
  const { empId, fromDate, toDate, reason } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO away (empId, fromDate, toDate, reason) VALUES (?, ?, ?, ?)",
      [empId, fromDate, toDate, reason]
    );
    res.json({ id: result.insertId, empId, fromDate, toDate, reason });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE afastamento
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
