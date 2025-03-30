import express from 'express';
import dotenv from 'dotenv';

import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import passwordRouter from './routes/password.js';

import { logger } from './middlewares/logger.js';
import { errorHandler, notFound } from './middlewares/errors.js';
import { connectToDB } from './config/db.js';

dotenv.config();

// connect to database
connectToDB();

// intit tha app
const app = express();

// Apply middle ware body to json
app.use(express.json());

// Apply middleware to handle form post requests
app.use(express.urlencoded({ extended: false }));

// log route url and method in console
app.use(logger);

// set view mode
app.set('view engine', 'ejs');

// Routes
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/password', passwordRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
