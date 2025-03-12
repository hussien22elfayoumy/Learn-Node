import express from 'express';
import joi from 'joi';

const router = express.Router();

const AuthorSchema = joi.object({
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
router.post('/', (req, res) => {
  const { error } = AuthorSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newAuthor = {
    id: authors.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  };

  res.status(201).json(newAuthor);
  authors.push(newAuthor);
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

  const { error } = AuthorSchema.validate(req.body);

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
