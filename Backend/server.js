import express from 'express';
import cors from 'cors';
import database_connection from './DataBase/db.js';
import userRouter from './Routes/user.js';

const app = express();
const port = 8004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form-data support

// Routes
app.use('/api', userRouter);

// Test endpoint
app.get("/", (req, res) => res.send("Backend server running"));

// Connect DB
database_connection();

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
