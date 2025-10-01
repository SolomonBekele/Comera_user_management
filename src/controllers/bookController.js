import {
  getAllBooksService,
  getBookByIdService,
  getBookByIsbnService,
  createBookService,
  updateBookByIdService,
  deleteBookService,
} from "../services/bookService.js";
import i18n from "../i18n/langConfig.js";
import logger from "../utils/logger.js";

// ==================== CREATE BOOK ====================
export const createBook = async (req, res) => {
  try {
    const { title, author, isbn, publicationDate, publisher, genre, language } = req.body;

    const book = await getBookByIsbnService(isbn);
    if (book) {
      logger.warn(`Book creation failed: ISBN already exists -> ${isbn}`);
      return res.status(400).json({ error: i18n.__("BOOK.CONFLICT_ISBN", { isbn }) });
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

    logger.info(`New book created: title="${title}", isbn=${isbn}`);
    return res.status(201).json({
      status: 201,
      message: i18n.__("BOOK.CREATED"),
      data: newBook,
    });
  } catch (err) {
    logger.error(`Error creating book: ${err.message}`, { stack: err.stack });
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

// ==================== GET ALL BOOKS ====================
export const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksService();
    logger.info(`Retrieved all books, count=${books.length}`);
    return res.status(200).json({
      status: 200,
      message: i18n.__("BOOK.RETRIEVED_ALL", { count: books.length }),
      data: books,
    });
  } catch (err) {
    logger.error(`Error retrieving all books: ${err.message}`, { stack: err.stack });
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

// ==================== GET BOOK BY ID ====================
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookByIdService(id);

    if (!book) {
      logger.warn(`Book not found by ID -> ${id}`);
      return res.status(404).json({
        status: 404,
        message: i18n.__("BOOK.NOT_FOUND_ID", { id }),
      });
    }

    logger.info(`Book retrieved by ID -> ${id}`);
    return res.status(200).json({
      status: 200,
      message: i18n.__("BOOK.RETRIEVED_BY_ID", { id }),
      data: book,
    });
  } catch (err) {
    logger.error(`Error retrieving book by ID: ${err.message}`, { stack: err.stack });
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

// ==================== GET BOOK BY ISBN ====================
export const getBookByIsbn = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await getBookByIsbnService(isbn);

    if (!book) {
      logger.warn(`Book not found by ISBN -> ${isbn}`);
      return res.status(404).json({
        status: 404,
        message: i18n.__("BOOK.NOT_FOUND_ISBN", { isbn }),
      });
    }

    logger.info(`Book retrieved by ISBN -> ${isbn}`);
    return res.status(200).json({
      status: 200,
      message: i18n.__("BOOK.RETRIEVED_BY_ISBN", { isbn }),
      data: book,
    });
  } catch (err) {
    logger.error(`Error retrieving book by ISBN: ${err.message}`, { stack: err.stack });
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

// ==================== UPDATE BOOK BY ID ====================
export const updateBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, publicationDate, publisher, genre, language } = req.body;

    const updatedBook = await updateBookByIdService(id, { title, author, isbn, publicationDate, publisher, genre, language });

    if (!updatedBook) {
      logger.warn(`Book update failed, not found -> ID: ${id}`);
      return res.status(404).json({ status: 404, message: i18n.__("BOOK.NOT_FOUND_ID", { id }) });
    }

    logger.info(`Book updated -> ID: ${id}, title="${title}"`);
    res.status(200).json({ status: 200, message: i18n.__("BOOK.UPDATED"), data: updatedBook });
  } catch (err) {
    logger.error(`Error updating book ID=${req.params.id}: ${err.message}`, { stack: err.stack });
    next(err);
  }
};

// ==================== DELETE BOOK BY ID ====================
export const deleteBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteBookService(id);

    if (!deleted) {
      logger.warn(`Book deletion failed, not found -> ID: ${id}`);
      return res.status(404).json({ status: 404, message: i18n.__("BOOK.NOT_FOUND_ID", { id }) });
    }

    logger.info(`Book deleted -> ID: ${id}`);
    res.status(200).json({ status: 200, message: i18n.__("BOOK.DELETED") });
  } catch (err) {
    logger.error(`Error deleting book ID=${req.params.id}: ${err.message}`, { stack: err.stack });
    next(err);
  }
};
