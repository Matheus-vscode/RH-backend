// backend/routes/employees.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid'); // gera ids únicos

// Listar todos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employees');
  res.json(rows);
});

// Criar funcionário
router.post('/', async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  const id = uuidv4(); // gera id único
  await pool.query(
    'INSERT INTO employees (id, name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, name, cpf, role, dept, salary, adm]
  );
  // Retorna o funcionário criado
  res.status(201).json({ id, name, cpf, role, dept, salary, adm });
});

// Atualizar funcionário
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;
  await pool.query(
    'UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?',
    [name, cpf, role, dept, salary, adm, id]
  );
  res.json({ message: 'Funcionário atualizado!' });
});

// Remover funcionário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM employees WHERE id=?', [id]);
  res.json({ message: 'Funcionário removido!' });
});

module.exports = router;
ports = router;
