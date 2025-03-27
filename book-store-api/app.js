import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';

import { logger } from './middlewares/logger.js';
import { errorHandler, notFound } from './middlewares/errors.js';

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

// Routes
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Error handling middleware

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
