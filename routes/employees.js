// backend/routes/employees.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Listar todos
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employees');
  res.json(rows);
});

// Criar funcionário
router.post('/', async (req, res) => {
  const { id, name, cpf, role, dept, salary, adm } = req.body;
  await pool.query(
    'INSERT INTO employees (id, name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, name, cpf, role, dept, salary, adm]
  );
  res.status(201).json({ message: 'Funcionário criado!' });
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
