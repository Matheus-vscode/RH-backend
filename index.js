const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const employeesRouter = require("./routes/employees");
const awayRouter = require("./routes/away");

app.use("/employees", employeesRouter);
app.use("/away", awayRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
