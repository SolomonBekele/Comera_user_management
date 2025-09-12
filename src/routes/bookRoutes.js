import express from "express"
import { createBook, getAllBooks, getBookById, getBookByIsbn,updateBookById,deleteBookById } from "../controllers/bookController.js"
import protectRoute from "../middlewares/protectRoute.js"
import authorizeRoles from "../middlewares/authorizeRole.js"
import { createBookDTO } from "../dto/bookDto.js"
import { validateDTO } from "../dto/validateDto.js"

const router = express.Router()

// Create a new book - Only accessible by librarians
router.post(
  '/',
  protectRoute,
  authorizeRoles('LIBRARIAN'),
  validateDTO(createBookDTO),
  createBook
);

// Get all books - Accessible by any authenticated user
router.get('/', protectRoute, getAllBooks);

// Get a single book by ID - Accessible by any authenticated user
router.get('/:id', protectRoute, getBookById);

// Get a single book by ISBN - Accessible by any authenticated user
router.get("/isbn/:isbn", protectRoute, getBookByIsbn);

// Update a book by ID - Only accessible by librarians
router.put("/:id",protectRoute,authorizeRoles('LIBRARIAN'),updateBookById);

// Delete a book by ID - Only accessible by librarians
router.delete("/:id",protectRoute,authorizeRoles('LIBRARIAN'),deleteBookById);


export default router;