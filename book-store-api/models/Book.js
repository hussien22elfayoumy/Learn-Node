import mongoose from 'mongoose';
const BooksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: number,
      required: true,
      trim: true,
      min: 0,
    },
    cover: {
      type: String,
      trim: true,
      enum: ['soft cover', 'hard cover'],
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model('Book', BooksSchema);
