import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1012Matheus2007", // sua senha do MySQL
  database: "rh"
});
