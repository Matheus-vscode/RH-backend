const express = require("express");
const router = express.Router();
const db = require("./db");

// Listar todos funcionários
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM funcionarios");
  res.json(rows);
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM funcionarios WHERE id = ?", [req.params.id]);
  res.json(rows[0] || {});
});

// Criar novo funcionário
router.post("/", async (req, res) => {
  const { id, nome, cpf, cargo_id, data_admissao, status } = req.body;
  await db.query(
    "INSERT INTO funcionarios (id, nome, cpf, cargo_id, data_admissao, status) VALUES (?, ?, ?, ?, ?, ?)",
    [id, nome, cpf, cargo_id, data_admissao, status || "ATIVO"]
  );
  res.json({ message: "Funcionário cadastrado com sucesso" });
});

// Atualizar
router.put("/:id", async (req, res) => {
  const { nome, cpf, cargo_id, data_admissao, status } = req.body;
  await db.query(
    "UPDATE funcionarios SET nome=?, cpf=?, cargo_id=?, data_admissao=?, status=? WHERE id=?",
    [nome, cpf, cargo_id, data_admissao, status, req.params.id]
  );
  res.json({ message: "Funcionário atualizado" });
});

// Deletar
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM funcionarios WHERE id=?", [req.params.id]);
  res.json({ message: "Funcionário removido" });
});

module.exports = router;