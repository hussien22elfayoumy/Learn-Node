import express from 'express';
import joi from 'joi';
import { Book } from '../models/Book.js';

const router = express.Router();

const BookSchema = joi.object({
  title: joi.string().trim().min(3).max(250).required(),
  author: joi.string().required(),
  price: joi.number().min(0).required(),
  description: joi.string().trim().min(3).max(500).required(),
  cover: joi.string().trim().valid('soft cover', 'hard cover').required(),
});

/**
 * @desc Get All routes
 * @route /api/books/
 * @method GET
 * @access public
 */
router.get('/', async (req, res) => {
  try {
    const bookList = await Book.find().populate('author', [
      '_id',
      'firstName',
      'lastName',
    ]);
    res.status(200).json({ message: 'success', books: bookList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something wend wrong' });
  }
});

/**
 * @desc Get Books by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author', [
      '_id',
      'firstName',
      'lastName',
    ]);
    if (book) {
      res.status(200).json({ message: 'Success', book });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something wend wrong' });
  }
});

/**
 * @desc Add new book
 * @route /api/books/
 * @method POST
 * @access public
 */
router.post('/', async (req, res) => {
  const { error } = BookSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      cover: req.body.cover,
      price: req.body.price,
    });

    const resApi = await newBook.save();
    res.status(201).json({ message: 'Sucess', book: resApi });
  } catch (err) {
    res.status(500).json({ message: 'Something wend wrong' });
  }
});

/**
 * @desc Update book by id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put('/:id', async (req, res) => {
  const { error } = BookSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      cover: req.body.cover,
      price: req.body.price,
    };

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: newBook,
      },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }

    res.status(200).json({ message: 'Book updated succussfully', data: book });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something wend wrong' });
  }
});

/**
 * @desc Delete book by id
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'book Deleted succussfully' });
  } catch (err) {
    console.log(err);
    return res.json(500).json({ message: 'Something went wrong' });
  }
});

export default router;
