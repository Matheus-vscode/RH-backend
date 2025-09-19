import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "root",       // ajuste seu usuário MySQL
  password: "1012Matheus2007",       // ajuste sua senha MySQL
  database: "rh"
});
