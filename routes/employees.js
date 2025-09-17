const express = require("express");
const router = express.Router();
const pool = require("../db");

// Listar funcionários
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM funcionarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar funcionário
router.post("/", async (req, res) => {
  const { nome, cpf, cargo, departamento, salario, admissao } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO funcionarios (nome, cpf, cargo, departamento, salario, admissao) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, cpf, cargo, departamento, salario, admissao]
    );
    res.status(201).json({ id: result.insertId, nome, cpf, cargo, departamento, salario, admissao });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Editar funcionário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, cargo, departamento, salario, admissao } = req.body;
  try {
    await pool.query(
      "UPDATE funcionarios SET nome=?, cpf=?, cargo=?, departamento=?, salario=?, admissao=? WHERE id=?",
      [nome, cpf, cargo, departamento, salario, admissao, id]
    );
    res.json({ id, nome, cpf, cargo, departamento, salario, admissao });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deletar funcionário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM funcionarios WHERE id=?", [id]);
    res.json({ message: "Funcionário removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
