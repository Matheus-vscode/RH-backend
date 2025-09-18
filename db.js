// backend/config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',      // seu host do MySQL
  user: 'root',           // seu usuário
  password: '',           // sua senha
  database: 'rh',         // nome da database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
