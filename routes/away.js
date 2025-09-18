// backend/routes/away.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Listar todos afastamentos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM away');
  res.json(rows);
});

// Criar afastamento
router.post('/', async (req, res) => {
  const { id, empId, fromDate, toDate, reason } = req.body;
  await pool.query(
    'INSERT INTO away (id, empId, fromDate, toDate, reason) VALUES (?, ?, ?, ?, ?)',
    [id, empId, fromDate, toDate, reason]
  );
  res.status(201).json({ message: 'Afastamento registrado!' });
});

// Remover afastamento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM away WHERE id=?', [id]);
  res.json({ message: 'Afastamento removido!' });
});

module.exports = router;

