const express = require("express");
const router = express.Router();
const pool = require("../db");

// Criar funcionário
router.post("/", async (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  if (!name) return res.status(400).json({ message: "O nome é obrigatório" });

  try {
    const [result] = await pool.execute(
      "INSERT INTO employees (name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?)",
      [name, cpf, role, dept, salary, adm]
    );
    res.status(201).json({ id: result.insertId, name, cpf, role, dept, salary, adm });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;

  try {
    await pool.execute(
      "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
      [name, cpf, role, dept, salary, adm, id]
    );
    res.json({ id, name, cpf, role, dept, salary, adm });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Remove afastamentos do funcionário antes
    await pool.execute("DELETE FROM away WHERE employee_id=?", [id]);
    await pool.execute("DELETE FROM employees WHERE id=?", [id]);
    res.json({ message: "Funcionário e afastamentos removidos", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
