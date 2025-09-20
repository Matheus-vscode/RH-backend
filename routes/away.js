const express = require("express");
const router = express.Router();
const db = require("./db");

// Listar afastamentos
router.get("/", async (req, res) => {
  const [rows] = await db.query(`
    SELECT a.*, f.nome as funcionario 
    FROM afastamentos a
    JOIN funcionarios f ON f.id = a.funcionario_id
  `);
  res.json(rows);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM afastamentos WHERE id=?", [req.params.id]);
  res.json(rows[0] || {});
});

// Criar afastamento
router.post("/", async (req, res) => {
  const { id, funcionario_id, data_inicio, data_fim, tipo, descricao } = req.body;
  await db.query(
    "INSERT INTO afastamentos (id, funcionario_id, data_inicio, data_fim, tipo, descricao) VALUES (?, ?, ?, ?, ?, ?)",
    [id, funcionario_id, data_inicio, data_fim, tipo, descricao]
  );
  res.json({ message: "Afastamento registrado" });
});

// Atualizar
router.put("/:id", async (req, res) => {
  const { funcionario_id, data_inicio, data_fim, tipo, descricao } = req.body;
  await db.query(
    "UPDATE afastamentos SET funcionario_id=?, data_inicio=?, data_fim=?, tipo=?, descricao=? WHERE id=?",
    [funcionario_id, data_inicio, data_fim, tipo, descricao, req.params.id]
  );
  res.json({ message: "Afastamento atualizado" });
});

// Deletar
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM afastamentos WHERE id=?", [req.params.id]);
  res.json({ message: "Afastamento removido" });
});

module.exports = router;