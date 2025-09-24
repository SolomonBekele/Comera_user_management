import { v4 as uuidv4 } from "uuid";
import Book from "../model/bookModel.js";
import  bookRepo from "../Repositories/books/bookRepo.js";

// ---- CREATE BOOK ----
export const createBookService = async (bookData) => {
  const id = uuidv4();
  const newBook = new Book(id, ...Object.values(bookData));
  return await bookRepo.createBookRepo(newBook);
};

// ---- GET ALL BOOKS ----
export const getAllBooksService = async () => {
  return await bookRepo.getAllBooksRepo();
};

// ---- GET BOOK BY ID ----
export const getBookByIdService = async (id) => {
  return await bookRepo.getBookByIdRepo(id);
};

// ---- GET BOOK BY TITLE ----
export const getBookByTitleService = async (title) => {
  return await bookRepo.getBookByTitleRepo(title);
};

// ---- GET BOOK BY ISBN ----
export const getBookByIsbnService = async (isbn) => {
  return await bookRepo.getBookByIsbnRepo(isbn);
};

// ---- UPDATE BOOK ----
export const updateBookByIdService = async (id, bookData) => {
  return await bookRepo.updateBookByIdRepo(id, bookData);
};

// ---- DELETE BOOK ----
export const deleteBookService = async (id) => {
  return await bookRepo.deleteBookRepo(id);
};
