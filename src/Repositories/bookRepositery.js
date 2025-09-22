import  pool  from "../config/db/mysqlConfig.js";
import { readBooksFile, writeBooksFile } from "../config/bookConfig/bookFileHandler.js";
import { Book } from "../model/bookModel.js";

const STORAGE_TYPE = process.env.STORAGE_TYPE || "file";

// ---- CREATE BOOK ----
export const createBookRepo = async (bookData) => {
  const id = bookData.id;
  if (STORAGE_TYPE === "mysql") {
    const sql = `INSERT INTO books (id, title, author, isbn, publication_date, publisher, genre, language)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(sql, [
      id,
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.publicationDate,
      bookData.publisher,
      bookData.genre,
      bookData.language,
    ]);
    return bookData;
  } else {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    parsedBooks.push({ ...bookData });
    await writeBooksFile(JSON.stringify(parsedBooks, null, 2));
    return bookData;
  }
};

// ---- GET ALL BOOKS ----
export const getAllBooksRepo = async () => {
  if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM books");
    return rows;
  } else {
    const booksData = await readBooksFile();
    return JSON.parse(booksData);
  }
};

// ---- GET BOOK BY ID ----
export const getBookByIdRepo = async (id) => {
  if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  } else {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    return parsedBooks.find((book) => book.id === id) || null;
  }
};

// ---- GET BOOK BY TITLE ----
export const getBookByTitleRepo = async (title) => {
  if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM books WHERE LOWER(title) = ?", [title.toLowerCase()]);
    return rows.length ? rows[0] : null;
  } else {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    return parsedBooks.find((book) => book.title.toLowerCase() === title.toLowerCase()) || null;
  }
};

// ---- GET BOOK BY ISBN ----
export const getBookByIsbnRepo = async (isbn) => {
  if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM books WHERE isbn = ?", [isbn]);
    return rows.length ? rows[0] : null;
  } else {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    return parsedBooks.find((book) => book.isbn === isbn) || null;
  }
};

// ---- UPDATE BOOK BY ID ----
export const updateBookByIdRepo = async (id, bookData) => {
  if (STORAGE_TYPE === "mysql") {
    const sql = `
      UPDATE books
      SET title = ?, author = ?, isbn = ?, publication_date = ?, publisher = ?, genre = ?, language = ?
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.publicationDate,
      bookData.publisher,
      bookData.genre,
      bookData.language,
      id,
    ]);

    if (result.affectedRows === 0) return null;
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    return rows[0];
  } else {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    const index = parsedBooks.findIndex((book) => book.id === id);

    if (index !== -1) {
      parsedBooks[index] = { ...parsedBooks[index], ...bookData };
      await writeBooksFile(JSON.stringify(parsedBooks, null, 2));
      return parsedBooks[index];
    }

    return null;
  }
};

// ---- DELETE BOOK ----
export const deleteBookRepo = async (id) => {
  if (STORAGE_TYPE === "mysql") {
    const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } else {
    const booksData = await readBooksFile();
    const parsedBooks = JSON.parse(booksData);
    const index = parsedBooks.findIndex((book) => book.id === id);
    if (index !== -1) {
      parsedBooks.splice(index, 1);
      await writeBooksFile(JSON.stringify(parsedBooks, null, 2));
      return true;
    }
    return false;
  }
};
