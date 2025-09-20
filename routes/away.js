const express = require("express");
const router = express.Router();
const pool = require("./db");

// Listar afastamentos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT a.id, a.funcionario_id, f.nome AS nome_funcionario, a.data_inicio, a.data_fim, a.tipo, a.descricao FROM afastamentos a LEFT JOIN funcionarios f ON a.funcionario_id=f.id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar afastamentos" });
  }
});

// Adicionar afastamento
router.post("/", async (req, res) => {
  const { funcionario_id, data_inicio, data_fim, tipo, descricao } = req.body;
  try {
    const id = require("crypto").randomUUID();
    await pool.query("INSERT INTO afastamentos (id, funcionario_id, data_inicio, data_fim, tipo, descricao) VALUES (?, ?, ?, ?, ?, ?)", [id, funcionario_id, data_inicio, data_fim || null, tipo || "OUTRO", descricao || ""]);
    res.json({ message: "Afastamento registrado", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar afastamento" });
  }
});

// Remover afastamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM afastamentos WHERE id=?", [id]);
    res.json({ message: "Afastamento removido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover afastamento" });
  }
});

module.exports = router;
