import express from 'express';
import { pool } from '../db/connection.js';
const router = express.Router();

// Get all feedback (with application/task info)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT f.*, a.Task_ID, t.Title as TaskTitle FROM FEEDBACK f
       LEFT JOIN APPLICATION a ON f.App_ID = a.App_ID
       LEFT JOIN TASK t ON a.Task_ID = t.Task_ID`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create feedback
router.post('/', async (req, res) => {
  const { App_ID, Rating, Comment } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO FEEDBACK (App_ID, Rating, Comment) VALUES (?, ?, ?)', [App_ID, Rating, Comment]);
    res.json({ insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
