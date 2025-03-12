import express from 'express';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import mongoose from 'mongoose';
const PORT = 5000;

// connect to database
mongoose
  .connect('mongodb://127.0.0.1:27017/bookStoreDB')
  .then(() => console.log('Connectd to mongodbb...'))
  .catch((err) => console.log('Faild to connect', err));

// intit tha app
const app = express();

// Apply middle ware
app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
