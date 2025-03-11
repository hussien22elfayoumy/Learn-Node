import express from 'express';
import booksRouter from './routes/books.js';

const PORT = 5000;
const app = express();

// Apply middle ware

app.use(express.json());
app.use('/api/books', booksRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
