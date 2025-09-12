import { v4 as uuidv4 } from "uuid";
import { readBooksFile, writeBooksFile } from "../config/bookConfig/bookFileHandler.js";
import { Book } from "../model/bookModel.js";

export const createBookService = async ({ title, author, isbn, publicationDate, publisher, genre, language }) => {
  try {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);

    const id = uuidv4();
    const newBook = new Book(id, title, author, isbn, publicationDate, publisher, genre, language);

    parsedBooks.push({ ...newBook });
    const newBooks = JSON.stringify(parsedBooks, null, 2);
    await writeBooksFile(newBooks);

    return newBook;
  } catch (err) {
    throw new Error("error on createBookService: " + err.message);
  }
};

export const getAllBooksService = async () => {
  try {
    const booksData = await readBooksFile();
    return JSON.parse(booksData);
  } catch (err) {
    throw new Error("error on getAllBooksService: " + err.message);
  }
};

export const getBookByIdService = async (id) => {
  try {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    const fetchedBook = parsedBooks.find((book) => book.id == id);
    return fetchedBook;
  } catch (err) {
    throw new Error("error on getBookByIdService: " + err.message);
  }
};

export const getBookByTitleService = async (title) => {
  try {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    const fetchedBook = parsedBooks.find(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
    return fetchedBook;
  } catch (err) {
    throw new Error("error on getBookByTitleService: " + err.message);
  }
};

export const getBookByIsbnService = async (isbn) => {
  try {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    const fetchedBook = parsedBooks.find((book) => book.isbn === isbn);
    return fetchedBook;
  } catch (err) {
    throw new Error("error on getBookByIsbnService: " + err.message);
  }
};

export const updateBookByIdService = async (id, { title, author, isbn, publicationDate, publisher, genre, language }) => {
  try {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);

    const fetchedIndex = parsedBooks.findIndex((book) => book.id === id);

    if (fetchedIndex !== -1) {
      parsedBooks[fetchedIndex].title = title;
      parsedBooks[fetchedIndex].author = author;
      parsedBooks[fetchedIndex].publicationDate = publicationDate;
      parsedBooks[fetchedIndex].publisher = publisher;
      parsedBooks[fetchedIndex].genre = genre;
      parsedBooks[fetchedIndex].language = language;

      const newBooks = JSON.stringify(parsedBooks, null, 2);
      await writeBooksFile(newBooks);

      return parsedBooks[fetchedIndex];
    }

    return null; // Book not found
  } catch (err) {
    throw new Error("error on updateBookService " + err.message);
  }
};

export const deleteBookService = async (id) => {
  try {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);

    const fetchedIndex = parsedBooks.findIndex((book) => book.id === id);

    if (fetchedIndex !== -1) {
      parsedBooks.splice(fetchedIndex, 1);
      const newBooks = JSON.stringify(parsedBooks, null, 2);
      await writeBooksFile(newBooks);
      return true; // Deleted successfully
    }

    return false; // Book not found
  } catch (err) {
    throw new Error("error on deleteBookService " + err.message);
  }
};

