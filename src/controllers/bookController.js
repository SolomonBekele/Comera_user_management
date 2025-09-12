// controllers/book.controller.js
import {
  getAllBooksService,
  getBookByIdService,
  getBookByIsbnService,
  createBookService,
  updateBookByIdService,
  deleteBookService,
} from "../services/bookService.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, isbn, publicationDate, publisher, genre, language } = req.body;
     const book = await getBookByIsbnService(isbn);
        if (book) {
          return res.status(400).json({ error: "isbn already exists" });
        }


    const newBook = await createBookService({
      title,
      author,
      isbn,
      publicationDate,
      publisher,
      genre,
      language,
    });
   
    return res.status(201).json({
      status: 201,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksService();
    return res.status(200).json({
      status: 200,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookByIdService(id);

    if (!book) {
      return res.status(404).json({
        status: 404,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export const getBookByIsbn = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await getBookByIsbnService(isbn);

    if (!book) {
      return res.status(404).json({
        status: 404,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};
export const updateBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, publicationDate, publisher, genre, language } = req.body;

    const updatedBook = await updateBookByIdService(id, { title, author, isbn, publicationDate, publisher, genre, language });

    if (!updatedBook) return res.status(404).json({ status: 404, message: "Book not found" });

    res.status(200).json({ status: 200, message: "Book updated successfully", data: updatedBook });
  } catch (err) {
    next(err);
  }
};


export const deleteBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteBookService(id);

    if (!deleted) return res.status(404).json({ status: 404, message: "Book not found" });

    res.status(200).json({ status: 200, message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
};


