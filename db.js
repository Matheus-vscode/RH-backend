import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "root",       // ajuste seu usuário MySQL
  password: "",       // ajuste sua senha MySQL
  database: "sistema_rh"
});
