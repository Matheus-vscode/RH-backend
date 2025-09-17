const express = require("express");
const router = express.Router();

// Exemplo de lista de funcionários (substitua por consultas ao banco depois)
let employees = [];

// Rota para listar todos os funcionários
router.get("/", (req, res) => {
    res.json(employees);
});

// Rota para cadastrar um novo funcionário
router.post("/add", (req, res) => {
    const { name, position, salary } = req.body;
    if (!name || !position || !salary) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const newEmployee = { id: employees.length + 1, name, position, salary };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

module.exports = router;
