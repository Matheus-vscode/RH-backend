const mysql = require("mysql2/promise");

// Configurações do banco de dados
const pool = mysql.createPool({
  host: "localhost",
  user: "root",       // seu usuário do MySQL
  password: "1012Matheus2007",       // coloque sua senha aqui, se tiver
  database: "rh_system",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
