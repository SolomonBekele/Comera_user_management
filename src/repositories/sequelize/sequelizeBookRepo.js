import  BookModel  from "./db/models/bookModelSequelize.js";

// ---- CREATE BOOK ----
export const createBookRepo = async (bookData) => {
  const book = await BookModel.create(bookData);
  return book.dataValues;
};

// ---- GET ALL BOOKS ----
export const getAllBooksRepo = async () => {
  const books = await BookModel.findAll();
  return books.map((book) => book.dataValues);
};

// ---- GET BOOK BY ID ----
export const getBookByIdRepo = async (id) => {
  const book = await BookModel.findByPk(id);
  return book ? book.dataValues : null;
};

// ---- GET BOOK BY TITLE ----
export const getBookByTitleRepo = async (title) => {
  const book = await BookModel.findOne({ where: { title } });
  return book ? book.dataValues : null;
};

// ---- GET BOOK BY ISBN ----
export const getBookByIsbnRepo = async (isbn) => {
  const book = await BookModel.findOne({ where: { isbn } });
  return book ? book.dataValues : null;
};

// ---- UPDATE BOOK BY ID ----
export const updateBookByIdRepo = async (id, bookData) => {
  const [updated] = await BookModel.update(bookData, { where: { id } });
  if (updated === 0) return null;
  const book = await BookModel.findByPk(id);
  return book ? book.dataValues : null;
};

// ---- DELETE BOOK ----
export const deleteBookRepo = async (id) => {
  const deleted = await BookModel.destroy({ where: { id } });
  return deleted > 0;
};
