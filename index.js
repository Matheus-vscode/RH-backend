import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ==================== FUNCIONÁRIOS ====================

// Listar todos
app.get("/employees", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT f.id, f.nome AS name, f.cpf, c.nome AS role, d.nome AS dept, f.data_admissao AS adm, hs.salario
       FROM funcionarios f
       LEFT JOIN cargos c ON f.cargo_id = c.id
       LEFT JOIN departamentos d ON c.departamento_id = d.id
       LEFT JOIN historico_salarial hs ON f.id = hs.funcionario_id
       ORDER BY f.nome`
    );
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar funcionários" }); }
});

// Criar novo
app.post("/employees", async (req, res) => {
  const { name, cpf, role, dept, adm, salary } = req.body;
  if (!name || !cpf) return res.status(400).json({ error: "Nome e CPF obrigatórios" });

  try {
    // Verificar departamento
    let [dep] = await pool.query("SELECT id FROM departamentos WHERE nome=?", [dept]);
    if (!dep.length) {
      const [r] = await pool.query("INSERT INTO departamentos(nome) VALUES(?)", [dept]);
      dep = [{ id: r.insertId }];
    }

    // Verificar cargo
    let [car] = await pool.query("SELECT id FROM cargos WHERE nome=? AND departamento_id=?", [role, dep[0].id]);
    if (!car.length) {
      const [r] = await pool.query("INSERT INTO cargos(nome, departamento_id) VALUES(?,?)", [role, dep[0].id]);
      car = [{ id: r.insertId }];
    }

    // Criar funcionário
    const id = uuidv4();
    await pool.query("INSERT INTO funcionarios(id,nome,cpf,cargo_id,data_admissao) VALUES(?,?,?,?,?)",
      [id, name, cpf, car[0].id, adm || null]);

    // Histórico salarial
    if (salary) {
      const hsId = uuidv4();
      await pool.query("INSERT INTO historico_salarial(id,funcionario_id,salario,data_inicio) VALUES(?,?,?,CURDATE())",
        [hsId, id, salary]);
    }

    res.json({ success: true, id });
  } catch(err){ console.error(err); res.status(500).json({ error:"Erro ao criar funcionário" }); }
});

// Atualizar funcionário
app.put("/employees/:id", async (req,res) => {
  const { id } = req.params;
  const { name, cpf, role, dept, adm, salary } = req.body;
  try {
    // Atualizar departamento
    let [dep] = await pool.query("SELECT id FROM departamentos WHERE nome=?", [dept]);
    if (!dep.length) {
      const [r] = await pool.query("INSERT INTO departamentos(nome) VALUES(?)", [dept]);
      dep = [{ id: r.insertId }];
    }

    // Atualizar cargo
    let [car] = await pool.query("SELECT id FROM cargos WHERE nome=? AND departamento_id=?", [role, dep[0].id]);
    if (!car.length) {
      const [r] = await pool.query("INSERT INTO cargos(nome, departamento_id) VALUES(?,?)", [role, dep[0].id]);
      car = [{ id: r.insertId }];
    }

    await pool.query("UPDATE funcionarios SET nome=?, cpf=?, cargo_id=?, data_admissao=? WHERE id=?",
      [name, cpf, car[0].id, adm || null, id]);

    if (salary) {
      const [rows] = await pool.query("SELECT id FROM historico_salarial WHERE funcionario_id=? ORDER BY data_inicio DESC LIMIT 1", [id]);
      if (rows.length) {
        await pool.query("UPDATE historico_salarial SET salario=? WHERE id=?", [salary, rows[0].id]);
      } else {
        const hsId = uuidv4();
        await pool.query("INSERT INTO historico_salarial(id,funcionario_id,salario,data_inicio) VALUES(?,?,?,CURDATE())", [hsId, id, salary]);
      }
    }

    res.json({ success:true });
  } catch(err){ console.error(err); res.status(500).json({ error:"Erro ao atualizar funcionário" }); }
});

// Deletar funcionário
app.delete("/employees/:id", async (req,res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM funcionarios WHERE id=?", [id]);
    res.json({ success:true });
  } catch(err){ console.error(err); res.status(500).json({ error:"Erro ao deletar funcionário" }); }
});

// ==================== SERVIDOR ====================
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`Servidor rodando em http://localhost:${PORT}`));
