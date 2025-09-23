// controllers/book.controller.js
import {
  getAllBooksService,
  getBookByIdService,
  getBookByIsbnService,
  createBookService,
  updateBookByIdService,
  deleteBookService,
} from "../services/bookService.js";
import i18n from "../i18n/langConfig.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, isbn, publicationDate, publisher, genre, language } = req.body;
     const book = await getBookByIsbnService(isbn);
        if (book) {
          return res.status(400).json({ error: i18n.__("BOOK.CONFLICT_ISBN",{isbn:isbn})});
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
      message: i18n.__("BOOK.CREATED"),
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
      message: i18n.__("BOOK.RETRIEVED_ALL",{count:books.length}),
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
        message: i18n.__("BOOK.NOT_FOUND_ID",{id:id}),
      });
    }

    return res.status(200).json({
      status: 200,
      message: i18n.__("BOOK.RETRIEVED_BY_ID",{id:id}),
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
        message: i18n.__("BOOK.NOT_FOUND_ISBN",{isbn:isbn}),
      });
    }

    return res.status(200).json({
      status: 200,
      message: i18n.__("BOOK.RETRIEVED_BY_ISBN",{isbn:isbn}),
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

    if (!updatedBook) return res.status(404).json({ status: 404, message: i18n.__("BOOK.NOT_FOUND_ID",{id:id})});

    res.status(200).json({ status: 200, message: i18n.__("BOOK.UPDATED"), data: updatedBook });
  } catch (err) {
    next(err);
  }
};


export const deleteBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteBookService(id);

    if (!deleted) return res.status(404).json({ status: 404, message: i18n.__("BOOK.NOT_FOUND_ID",{id:id}) });

    res.status(200).json({ status: 200, message: i18n.__("BOOK.DELETED") });
  } catch (err) {
    next(err);
  }
};


