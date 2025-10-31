import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRouter from './routes/users.js';
import skillsRouter from './routes/skills.js';
import tasksRouter from './routes/tasks.js';
import applicationsRouter from './routes/applications.js';
import feedbackRouter from './routes/feedback.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/feedback', feedbackRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
