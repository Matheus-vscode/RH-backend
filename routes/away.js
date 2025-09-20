// routes/away.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Listar afastamentos
router.get("/", (req, res) => {
  db.query("SELECT * FROM away", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Cadastrar afastamento
router.post("/", (req, res) => {
  const { employee_id, start_date, end_date, reason } = req.body;
  const sql = `
    INSERT INTO away (employee_id, start_date, end_date, reason)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [employee_id, start_date, end_date, reason], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, message: "Afastamento cadastrado!" });
  });
});

module.exports = router;
