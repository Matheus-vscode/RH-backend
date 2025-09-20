const express = require("express");
const router = express.Router();
const pool = require("./db");

// Listar todos os funcionários
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT f.id, f.nome, f.cpf, c.nome AS cargo, d.nome AS dept FROM funcionarios f LEFT JOIN cargos c ON f.cargo_id=c.id LEFT JOIN departamentos d ON c.departamento_id=d.id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar funcionários" });
  }
});

// Adicionar novo funcionário
router.post("/", async (req, res) => {
  const { nome, cpf, cargo_id, data_admissao, salary } = req.body;
  try {
    const id = require("crypto").randomUUID();
    await pool.query("INSERT INTO funcionarios (id, nome, cpf, cargo_id, data_admissao) VALUES (?, ?, ?, ?, ?)", [id, nome, cpf, cargo_id || null, data_admissao]);
    
    // Historico salarial
    if (salary) {
      const histId = require("crypto").randomUUID();
      await pool.query("INSERT INTO historico_salarial (id, funcionario_id, salario, data_inicio) VALUES (?, ?, ?, ?)", [histId, id, salary, new Date()]);
    }

    res.json({ message: "Funcionário adicionado", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar funcionário" });
  }
});

// Editar funcionário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, cargo_id, data_admissao } = req.body;
  try {
    await pool.query("UPDATE funcionarios SET nome=?, cpf=?, cargo_id=?, data_admissao=? WHERE id=?", [nome, cpf, cargo_id, data_admissao, id]);
    res.json({ message: "Funcionário atualizado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar funcionário" });
  }
});

// Deletar funcionário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM funcionarios WHERE id=?", [id]);
    res.json({ message: "Funcionário removido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover funcionário" });
  }
});

module.exports = router;
