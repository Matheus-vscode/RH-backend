// db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",       // ajuste se necessário
  password: "123456", // ajuste se necessário
  database: "rh_system"
});

connection.connect(err => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

module.exports = connection;
