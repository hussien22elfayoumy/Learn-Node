import mongoose from 'mongoose';
import dontenv from 'dotenv';
import { Book } from './models/Book.js';
import { books } from './data.js';
import { connectToDB } from './config/db.js';

dontenv.config();

// connect to database
connectToDB();

async function bookSeeder() {
  try {
    // await Promise.all(
    //   books.map(async (book) => {
    //     const newBook = new Book({
    //       title: book.title,
    //       author: book.author,
    //       description: book.description,
    //       price: book.price,
    //       cover: book.cover,
    //     });

    //     const result = await newBook.save();
    //     console.log(`book [${result.title}] seeded successfully`);
    //   })
    // );

    await Book.insertMany(books);

    console.log('------------------------------------------');
    console.log('------- Books seeded successfully --------');
    console.log('------------------------------------------');
  } catch (err) {
    console.log('Error seeding books', err);
  } finally {
    process.exit(1);
  }
}

async function removeAllBooks() {
  try {
    await Book.deleteMany();
    console.log('------------------------------------------');
    console.log('------- Books removed successfully -------');
    console.log('------------------------------------------');
  } catch (err) {
    console.log('Error removing books', err);
  } finally {
    process.exit(1);
  }
}

if (process.argv[2] === '-seed') {
  bookSeeder();
} else if (process.argv[2] === '-remove') {
  removeAllBooks();
}
