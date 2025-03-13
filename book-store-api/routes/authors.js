import express from 'express';
import joi from 'joi';
import { Author } from '../models/Author.js';

const router = express.Router();

const AuthorSchemaValid = joi.object({
  firstName: joi.string().trim().min(3).max(200).required(),
  lastName: joi.string().trim().min(3).max(200).required(),
  nationality: joi.string().trim().min(3).max(200).required(),
  image: joi.string().trim(),
});

/**
 * @desc Get All authors
 * @route /api/authors/
 * @method GET
 * @access public
 */
router.get('/', async (req, res) => {
  try {
    const authorsList = await Author.find();
    res.status(200).json({ message: 'success', authors: authorsList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something wend wrong' });
  }
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json({ message: 'success', author: author });
    } else {
      res.status(404).json({ message: 'author not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something wend wrong' });
  }
});

/**
 * @desc Add new author
 * @route /api/authors/
 * @method POST
 * @access public
 */
router.post('/', async (req, res) => {
  const { error } = AuthorSchemaValid.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newAuthor = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const resApi = await newAuthor.save();

    res.status(201).json(resApi);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

/**
 * @desc Update author by id
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */
router.put('/:id', async (req, res) => {
  const { error } = AuthorSchemaValid.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newAuthor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  };

  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: newAuthor,
      },
      { new: true }
    );

    if (!author) {
      return res.status(404).json({ message: 'author not found' });
    }

    res
      .status(200)
      .json({ message: 'author updated succussfully', data: author });
  } catch (err) {
    res.json(500).json({ message: 'Something went wrong' });
  }
});

/**
 * @desc Delete author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'author not found' });
    }

    await Author.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Author Deleted succussfully' });
  } catch (err) {
    console.log(err);
    return res.json(500).json({ message: 'Something went wrong' });
  }
});

export default router;
