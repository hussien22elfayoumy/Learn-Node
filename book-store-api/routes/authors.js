import express from 'express';

const router = express.Router();

const AuthorSchema = joi.object({
  title: joi.string().trim().min(3).max(200).required(),
  author: joi.string().trim().min(3).max(200).required(),
  price: joi.number().min(0).required(),
  description: joi.string().trim().min(3).max(500).required(),
  cover: joi.string().trim().required(),
});

const authors = [];

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
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    cover: req.body.cover,
    price: req.body.price,
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
