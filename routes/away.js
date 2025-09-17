const express = require("express");
const router = express.Router();
const pool = require("../db");

// Listar afastamentos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM afastamentos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Registrar afastamento
router.post("/", async (req, res) => {
  const { funcionarioId, dataInicio, dataFim, motivo } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO afastamentos (funcionarioId, dataInicio, dataFim, motivo) VALUES (?, ?, ?, ?)",
      [funcionarioId, dataInicio, dataFim, motivo]
    );
    res.status(201).json({ id: result.insertId, funcionarioId, dataInicio, dataFim, motivo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remover afastamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM afastamentos WHERE id=?", [id]);
    res.json({ message: "Afastamento removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

