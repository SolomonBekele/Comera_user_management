import { v4 as uuidv4 } from "uuid";
import {
  createBookRepo,
  getAllBooksRepo,
  getBookByIdRepo,
  getBookByTitleRepo,
  getBookByIsbnRepo,
  updateBookByIdRepo,
  deleteBookRepo
} from "../Repositories/bookRepositery.js";
import { Book } from "../model/bookModel.js";

// ---- CREATE BOOK ----
export const createBookService = async (bookData) => {
  const id = uuidv4();
  const newBook = new Book(id, ...Object.values(bookData));
  return await createBookRepo(newBook);
};

// ---- GET ALL BOOKS ----
export const getAllBooksService = async () => await getAllBooksRepo();

// ---- GET BOOK BY ID ----
export const getBookByIdService = async (id) => await getBookByIdRepo(id);

// ---- GET BOOK BY TITLE ----
export const getBookByTitleService = async (title) => await getBookByTitleRepo(title);

// ---- GET BOOK BY ISBN ----
export const getBookByIsbnService = async (isbn) => await getBookByIsbnRepo(isbn);

// ---- UPDATE BOOK ----
export const updateBookByIdService = async (id, bookData) =>
  await updateBookByIdRepo(id, bookData);

// ---- DELETE BOOK ----
export const deleteBookService = async (id) => await deleteBookRepo(id);
