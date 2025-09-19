import express from "express";
import cors from "cors";
import employeesRoutes from "./routes/employees.js";
import awayRoutes from "./routes/away.js";

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use("/employees", employeesRoutes);
app.use("/away", awayRoutes);

app.listen(3001, () => {
  console.log("✅ Backend rodando em http://localhost:3001");
});
