import express from "express";
import { db } from "../db.js";

const router = express.Router();

// listar
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM away");
  res.json(rows);
});

// criar
router.post("/", async (req, res) => {
  const { empId, fromDate, toDate, reason } = req.body;
  const [result] = await db.query(
    "INSERT INTO away (empId, fromDate, toDate, reason) VALUES (?, ?, ?, ?)",
    [empId, fromDate, toDate, reason]
  );
  res.json({ id: result.insertId, empId, fromDate, toDate, reason });
});

// deletar 1 afastamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM away WHERE id=?", [id]);
  res.json({ success: true });
});

// deletar afastamentos de um funcionário
router.delete("/employee/:empId", async (req, res) => {
  const { empId } = req.params;
  await db.query("DELETE FROM away WHERE empId=?", [empId]);
  res.json({ success: true });
});

export default router;

