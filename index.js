// index.js
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// ================== Configuração do App ==================
const app = express();
app.use(cors());
app.use(express.json());

// ================== Configuração do Banco ==================
const sequelize = new Sequelize(
  process.env.DB_NAME || 'rh',       // nome do banco
  process.env.DB_USER || 'root',     // usuário do MySQL
  process.env.DB_PASSWORD || '',     // senha do MySQL
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

// Teste de conexão com o banco
sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao MySQL com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar ao MySQL:', err));

// ================== Rotas ==================
// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'Backend rodando!', db: [{ result: 2 }] });
});

// Exemplo de rota de funcionário
// app.use('/funcionarios', require('./routes/funcionarios'));

// ================== Start do servidor ==================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));
