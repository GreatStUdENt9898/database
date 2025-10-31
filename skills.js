import express from 'express';
import { pool } from '../db/connection.js';
const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SKILL');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create skill
router.post('/', async (req, res) => {
  const { Skill_Name, Description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO SKILL (Skill_Name, Description) VALUES (?, ?)', [Skill_Name, Description]);
    res.json({ insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete skill
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM SKILL WHERE Skill_ID = ?', [req.params.id]);
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
