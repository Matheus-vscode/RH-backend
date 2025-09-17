const express = require("express");
const router = express.Router();
const pool = require("../db");

// Rota para registrar um afastamento
router.post("/add", async (req, res) => {
    const { employeeId, startDate, endDate, reason } = req.body;
    if (!employeeId || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO away (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
            [employeeId, startDate, endDate, reason]
        );
        res.status(201).json({ id: result.insertId, employeeId, startDate, endDate, reason });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para listar todos os afastamentos
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM away");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
