const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const employeesRouter = require("./employees");
const awayRouter = require("./away");

app.use("/api/employees", employeesRouter);
app.use("/api/away", awayRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
