import { readBooksFile, writeBooksFile } from "../file-storage/config/bookConfig/bookFileHandler.js";

// ---- CREATE BOOK ----
export const createBookRepo = async (bookData) => {
  const booksData = await readBooksFile();
  const parsedBooks = JSON.parse(booksData);
  parsedBooks.push({ ...bookData });
  await writeBooksFile(JSON.stringify(parsedBooks, null, 2));
  return bookData;
};

// ---- GET ALL BOOKS ----
export const getAllBooksRepo = async () => {
  const booksData = await readBooksFile();
  return JSON.parse(booksData);
};

// ---- GET BOOK BY ID ----
export const getBookByIdRepo = async (id) => {
  const booksData = await readBooksFile();
  const parsedBooks = JSON.parse(booksData);
  return parsedBooks.find((book) => book.id === id) || null;
};

// ---- GET BOOK BY TITLE ----
export const getBookByTitleRepo = async (title) => {
  const booksData = await readBooksFile();
  const parsedBooks = JSON.parse(booksData);
  return parsedBooks.find((book) => book.title.toLowerCase() === title.toLowerCase()) || null;
};

// ---- GET BOOK BY ISBN ----
export const getBookByIsbnRepo = async (isbn) => {
  const booksData = await readBooksFile();
  const parsedBooks = JSON.parse(booksData);
  return parsedBooks.find((book) => book.isbn === isbn) || null;
};

// ---- UPDATE BOOK BY ID ----
export const updateBookByIdRepo = async (id, bookData) => {
  const booksData = await readBooksFile();
  const parsedBooks = JSON.parse(booksData);
  const index = parsedBooks.findIndex((book) => book.id === id);

  if (index !== -1) {
    parsedBooks[index] = { ...parsedBooks[index], ...bookData };
    await writeBooksFile(JSON.stringify(parsedBooks, null, 2));
    return parsedBooks[index];
  }
  return null;
};

// ---- DELETE BOOK ----
export const deleteBookRepo = async (id) => {
  const booksData = await readBooksFile();
  const parsedBooks = JSON.parse(booksData);
  const index = parsedBooks.findIndex((book) => book.id === id);

  if (index !== -1) {
    parsedBooks.splice(index, 1);
    await writeBooksFile(JSON.stringify(parsedBooks, null, 2));
    return true;
  }
  return false;
};
