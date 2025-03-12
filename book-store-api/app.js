import express from 'express';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';

const PORT = 5000;
const app = express();

// Apply middle ware

app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
