const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET todos os funcionários
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST novo funcionário
router.post("/", (req, res) => {
  const { name, cpf, role, dept, salary, adm } = req.body;
  db.query(
    "INSERT INTO employees (name, cpf, role, dept, salary, adm) VALUES (?, ?, ?, ?, ?, ?)",
    [name, cpf, role, dept, salary, adm],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ id: result.insertId, name, cpf, role, dept, salary, adm });
    }
  );
});

// PUT editar funcionário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, salary, adm } = req.body;
  try {
    await pool.query(
      "UPDATE employees SET name=?, cpf=?, role=?, dept=?, salary=?, adm=? WHERE id=?",
      [name, cpf, role, dept, salary, adm, id]
    );
    res.json({ id, name, cpf, role, dept, salary, adm });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE funcionário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM employees WHERE id=?", [id]);
    res.json({ message: "Funcionário removido" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
