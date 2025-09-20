// index.js
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const { randomUUID } = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// ============================
// Conexão com MySQL
// ============================
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "SUA_SENHA",
  database: "rh_empresa",
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

// ============================
// Rotas
// ============================

// Pegar todos funcionários
app.get("/api/funcionarios", async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query(`
      SELECT f.id, f.nome, f.cpf, c.nome AS cargo, d.nome AS departamento, f.data_admissao, f.status
      FROM funcionarios f
      LEFT JOIN cargos c ON f.cargo_id = c.id
      LEFT JOIN departamentos d ON c.departamento_id = d.id
    `);
    await conn.end();
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar funcionários" });
  }
});

// Adicionar novo funcionário
app.post("/api/funcionarios", async (req, res) => {
  try {
    const { nome, cpf, cargo_id, data_admissao, status } = req.body;
    const id = randomUUID();

    const conn = await getConnection();
    await conn.query(
      "INSERT INTO funcionarios (id, nome, cpf, cargo_id, data_admissao, status) VALUES (?, ?, ?, ?, ?, ?)",
      [id, nome, cpf, cargo_id || null, data_admissao || null, status || "ATIVO"]
    );
    await conn.end();
    res.json({ success: true, id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao salvar funcionário" });
  }
});

// Deletar funcionário
app.delete("/api/funcionarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await getConnection();
    await conn.query("DELETE FROM funcionarios WHERE id = ?", [id]);
    await conn.end();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao remover funcionário" });
  }
});

// Atualizar funcionário
app.put("/api/funcionarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, cargo_id, data_admissao, status } = req.body;

    const conn = await getConnection();
    await conn.query(
      "UPDATE funcionarios SET nome=?, cpf=?, cargo_id=?, data_admissao=?, status=? WHERE id=?",
      [nome, cpf, cargo_id || null, data_admissao || null, status || "ATIVO", id]
    );
    await conn.end();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao atualizar funcionário" });
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
