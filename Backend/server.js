import express from 'express';
import cors from 'cors';
import database_connection from './DataBase/db.js';
import userRouter from './Routes/user.js';
import movieRouter from './Routes/movie.js';

const app = express();
const port = 8004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));



// Mount main router
app.use('/api', userRouter);
app.use('/movie',movieRouter)

// Root test
app.get("/", (req, res) => res.send("Backend server running"));

// Connect DB
database_connection();

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
