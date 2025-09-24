import pool from "../../config/db/mysqlConfig.js";

// ---- CREATE BOOK ----
export const createBookRepo = async (bookData) => {
  const sql = `INSERT INTO books (id, title, author, isbn, publication_date, publisher, genre, language)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  await pool.query(sql, [
    bookData.id,
    bookData.title,
    bookData.author,
    bookData.isbn,
    bookData.publicationDate,
    bookData.publisher,
    bookData.genre,
    bookData.language,
  ]);
  return bookData;
};

// ---- GET ALL BOOKS ----
export const getAllBooksRepo = async () => {
  const [rows] = await pool.query("SELECT * FROM books");
  return rows;
};

// ---- GET BOOK BY ID ----
export const getBookByIdRepo = async (id) => {
  const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
  return rows.length ? rows[0] : null;
};

// ---- GET BOOK BY TITLE ----
export const getBookByTitleRepo = async (title) => {
  const [rows] = await pool.query("SELECT * FROM books WHERE LOWER(title) = ?", [title.toLowerCase()]);
  return rows.length ? rows[0] : null;
};

// ---- GET BOOK BY ISBN ----
export const getBookByIsbnRepo = async (isbn) => {
  const [rows] = await pool.query("SELECT * FROM books WHERE isbn = ?", [isbn]);
  return rows.length ? rows[0] : null;
};

// ---- UPDATE BOOK BY ID ----
export const updateBookByIdRepo = async (id, bookData) => {
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
};

// ---- DELETE BOOK ----
export const deleteBookRepo = async (id) => {
  const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
