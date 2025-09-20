const mysql = require("mysql2/promise");

// Substitua pelos seus dados do DbGate / MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "rh_empresa",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
