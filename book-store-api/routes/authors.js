import express from 'express';
import { authorizeAdmin } from '../middlewares/verifyToken.js';
import {
  addNewAuthor,
  deleteAuthor,
  getAllAuthors,
  updateAuthor,
  getAuthorById,
} from '../controllers/authorController.js';

const router = express.Router();

/**
 * @desc Get All authors
 * @route /api/authors/
 * @method GET
 * @access public
 */
router.get('/', getAllAuthors);

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get('/:id', getAuthorById);

/**
 * @desc Add new author
 * @route /api/authors/
 * @method POST
 * @access private (only admin)
 */
router.post('/', authorizeAdmin, addNewAuthor);

/**
 * @desc Update author by id
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
router.put('/:id', authorizeAdmin, updateAuthor);

/**
 * @desc Delete author
 * @route /api/authors/:id
 * @method DELETE
 * @access private (only admin)
 */
router.delete('/:id', authorizeAdmin, deleteAuthor);

export default router;
