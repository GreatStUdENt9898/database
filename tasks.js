import express from 'express';
import { pool } from '../db/connection.js';
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT t.*, u.Name as EmployerName FROM TASK t LEFT JOIN USER u ON t.Employer_ID = u.User_ID');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create task
router.post('/', async (req, res) => {
  const { Title, Description, Category, Budget, Deadline, Employer_ID } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO TASK (Title, Description, Category, Budget, Deadline, Employer_ID) VALUES (?, ?, ?, ?, ?, ?)',
      [Title, Description, Category, Budget || null, Deadline || null, Employer_ID || null]
    );
    res.json({ insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM TASK WHERE Task_ID = ?', [req.params.id]);
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
