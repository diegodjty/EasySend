import express from 'express';
import { db } from './config/db.js';
import userRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import linksRoutes from './routes/linksRoutes.js';
import filesRoutes from './routes/filesRoutes.js';

// Create server
const app = express();

// Connect to DB
db();

// App port
const port = process.env.PORT || 4000;

app.use(express.json());

// app routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);
app.use('/api/files', filesRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
