import express from 'express';
import joi from 'joi';
import Author from '../models/Author.js';

const router = express.Router();

const AuthorSchemaValid = joi.object({
  firstName: joi.string().trim().min(3).max(200).required(),
  lastName: joi.string().trim().min(3).max(200).required(),
  nationality: joi.string().trim().min(3).max(200).required(),
  image: joi.string().trim(),
});

const authors = [
  {
    id: 1,
    firstName: 'Hussien',
    lastName: 'Mohammed',
    nationality: 'Egypt',
    image: 'default-img.png',
  },
  {
    id: 2,
    firstName: 'Hussien2',
    lastName: 'Mohammed2',
    nationality: 'Egypt',
    image: 'default-img.png',
  },
];

/**
 * @desc Get All authors
 * @route /api/authors/
 * @method GET
 * @access public
 */
router.get('/', (req, res) => {
  res.status(200).json(authors);
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get('/:id', (req, res) => {
  const author = authors.find((b) => b.id === +req.params.id);

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: 'author not found' });
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
router.put('/:id', (req, res) => {
  const author = authors.find((b) => b.id === +req.params.id);

  if (!author) {
    return res.status(404).json({ message: 'author not found' });
  }

  const { error } = AuthorSchemaValid.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  res
    .status(200)
    .json({ message: 'author updated succussfully', data: authors });
});

/**
 * @desc Delete author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', (req, res) => {
  const author = authors.find((b) => b.id === +req.params.id);

  if (!author) {
    return res.status(404).json({ message: 'author not found' });
  }

  res
    .status(200)
    .json({ message: 'author Deleted succussfully', data: authors });
});

export default router;
