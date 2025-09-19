import express from "express";
import { db } from "../db.js";
import { randomUUID } from "crypto";

const router = express.Router();

// Listar todos afastamentos
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM away");
  res.json(rows);
});

// Criar afastamento
router.post("/", async (req, res) => {
  const { empId, fromDate, toDate, reason } = req.body;
  const id = randomUUID();
  await db.query(
    "INSERT INTO away (id, empId, fromDate, toDate, reason) VALUES (?, ?, ?, ?, ?)",
    [id, empId, fromDate, toDate, reason]
  );
  res.json({ id, empId, fromDate, toDate, reason });
});

// Remover afastamento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM away WHERE id=?", [id]);
  res.json({ success: true });
});

export default router;

