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

/**
 * @desc Get All routes
 * @route /api/books/
 * @method GET
 * @access public
 */
router.get('/', (req, res) => {
  res.json(books);
});

/**
 * @desc Get Books by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get('/:id', (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

/**
 * @desc Add new book
 * @route /api/books/
 * @method POST
 * @access public
 */
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

/**
 * @desc Update book by id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put('/:id', (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { error } = BookSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    cover: req.body.cover,
    price: req.body.price,
  };

  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1, { ...newBook, id: book.id });

  res.status(200).json({ message: 'Book updated succussfully', data: books });
});

/**
 * @desc Delete book by id
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1);

  res.status(200).json({ message: 'Book Deleted succussfully', data: books });
});

export default router;
