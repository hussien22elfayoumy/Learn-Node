import express from 'express';
import joi from 'joi';

const router = express.Router();

const BookSchema = joi.object({
  title: joi.string().trim().min(3).max(200).required(),
  author: joi.string().trim().min(3).max(200).required(),
  price: joi.number().min(0).required(),
  description: joi.string().trim().min(3).max(500).required(),
  cover: joi.string().trim().required(),
});

const books = [
  {
    id: 1,
    title: 'book 1',
    author: 'author 1',
    description: 'Description 1',
    price: 10,
    cover: 'cover 1',
  },
  {
    id: 2,
    title: 'book 2',
    author: 'author 2',
    description: 'Description 2',
    price: 20,
    cover: 'cover 2',
  },
];

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

router.post('/', (req, res) => {
  const { error } = BookSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    cover: req.body.cover,
    price: req.body.price,
  };

  res.status(201).json(newBook);
  books.push(newBook);
});

export default router;
