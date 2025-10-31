import express from 'express';
import { pool } from '../db/connection.js';
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM USER');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create user
router.post('/', async (req, res) => {
  const { Name, Email, Role, Contact, Password } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO USER (Name, Email, Role, Contact, Password) VALUES (?, ?, ?, ?, ?)', [Name, Email, Role, Contact, Password]);
    res.json({ insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
