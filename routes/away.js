const express = require("express");
const router = express.Router();

// Exemplo de lista de afastamentos
let awayRecords = [];

// Rota para registrar um afastamento
router.post("/add", (req, res) => {
    const { employeeId, startDate, endDate, reason } = req.body;
    if (!employeeId || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const newAway = { id: awayRecords.length + 1, employeeId, startDate, endDate, reason };
    awayRecords.push(newAway);
    res.status(201).json(newAway);
});

// Rota para listar todos os afastamentos
router.get("/", (req, res) => {
    res.json(awayRecords);
});

module.exports = router;
