import express from 'express';
import { db } from './config/db.js';
import userRoutes from './routes/usersRoutes.js';

// Create server
const app = express();

// Connect to DB
db();

// App port
const port = process.env.PORT || 4000;

// app routes
app.use('/api/users', userRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
