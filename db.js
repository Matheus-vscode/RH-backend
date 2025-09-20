const mysql = require("mysql2/promise");

// Configuração do banco (ajuste conforme seu ambiente)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sua_senha",
  database: "rh_empresa",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;