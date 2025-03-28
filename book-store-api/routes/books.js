import express from 'express';
import {
  addNewbook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../controllers/bookController.js';
import { authorizeAdmin } from '../middlewares/verifyToken.js';

const router = express.Router();

/**
 * @desc Get All routes
 * @route /api/books/
 * @method GET
 * @access public
 */
router.get('/', getAllBooks);

/**
 * @desc Get Books by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get('/:id', getBookById);

/**
 * @desc Add new book
 * @route /api/books/
 * @method POST
 * @access private (only admin)
 */
router.post('/', authorizeAdmin, addNewbook);

/**
 * @desc Update book by id
 * @route /api/books/:id
 * @method PUT
 * @access private (only admin)
 */
router.put('/:id', authorizeAdmin, updateBook);

/**
 * @desc Delete book by id
 * @route /api/books/:id
 * @method DELETE
 * @access private (only admin)
 */
router.delete('/:id', authorizeAdmin, deleteBook);

export default router;
