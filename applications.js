import express from 'express';
import { pool } from '../db/connection.js';
const router = express.Router();

// Get all applications (with task and freelancer info)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, t.Title as TaskTitle, u.Name as FreelancerName FROM APPLICATION a
       LEFT JOIN TASK t ON a.Task_ID = t.Task_ID
       LEFT JOIN USER u ON a.Freelancer_ID = u.User_ID`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Apply for a task
router.post('/', async (req, res) => {
  const { Task_ID, Freelancer_ID } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO APPLICATION (Task_ID, Freelancer_ID) VALUES (?, ?)', [Task_ID, Freelancer_ID]);
    res.json({ insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update application status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body; // Expected: Pending, Accepted, Rejected, Completed
  try {
    const [result] = await pool.query('UPDATE APPLICATION SET Status = ? WHERE App_ID = ?', [status, req.params.id]);
    res.json({ affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
