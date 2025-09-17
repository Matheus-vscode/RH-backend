const express = require("express");
const cors = require("cors");
const employeesRouter = require("./routes/employees");
const awayRouter = require("./routes/away");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/employees", employeesRouter);
app.use("/away", awayRouter);

app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));
