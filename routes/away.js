// backend/routes/away.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid'); // gera ids únicos

// Listar todos afastamentos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM away');
  res.json(rows);
});

// Criar afastamento
router.post('/', async (req, res) => {
  const { empId, fromDate, toDate, reason } = req.body;
  const id = uuidv4(); // gera id único
  await pool.query(
    'INSERT INTO away (id, empId, fromDate, toDate, reason) VALUES (?, ?, ?, ?, ?)',
    [id, empId, fromDate, toDate, reason]
  );
  // Retorna o afastamento criado
  res.status(201).json({ id, empId, fromDate, toDate, reason });
});

// Remover afastamento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM away WHERE id=?', [id]);
  res.json({ message: 'Afastamento removido!' });
});

// Remover todos afastamentos de um funcionário
router.delete('/employee/:empId', async (req, res) => {
  const { empId } = req.params;
  await pool.query('DELETE FROM away WHERE empId=?', [empId]);
  res.json({ message: 'Afastamentos do funcionário removidos!' });
});

module.exports = router;

