import express from 'express';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from './middlewares/logger.js';

dotenv.config();

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connectd to mongodbb...'))
  .catch((err) => console.log('Faild to connect', err));

// intit tha app
const app = express();

// Apply middle ware
app.use(express.json());

app.use(logger);

app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
