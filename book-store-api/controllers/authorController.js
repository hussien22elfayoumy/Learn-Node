import joi from 'joi';
import { Author } from '../models/Author.js';

const AuthorSchema = joi.object({
  firstName: joi.string().trim().min(3).max(200).required(),
  lastName: joi.string().trim().min(3).max(200).required(),
  nationality: joi.string().trim().min(3).max(200).required(),
  image: joi.string().trim(),
});

export const getAllAuthors = async (req, res) => {
  try {
    const authorsList = await Author.find();
    res.status(200).json({ message: 'success', authors: authorsList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something wend wrong' });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json({ message: 'success', author: author });
    } else {
      res.status(404).json({ message: 'author not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const addNewAuthor = async (req, res) => {
  const { error } = AuthorSchema.validate(req.body);

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
    res.status(500).json({ message: err.message });
  }
};

export const updateAuthor = async (req, res) => {
  const { error } = AuthorSchema.validate(req.body);

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
    res.json(500).json({ message: err.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'author not found' });
    }

    await Author.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Author Deleted succussfully' });
  } catch (err) {
    console.log(err);
    return res.json(500).json({ message: err.message });
  }
};
