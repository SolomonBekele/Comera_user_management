import express from "express"
import {addBookBorrowing, getAllBorrowingsWithDetails, getBookHistoryByBookId, getBooksByUserId,getUsersByBookId, returnBookBorrowing,getActiveBorrowingsWithDetails } from "../controllers/borrowController.js"
import protectRoute from "../middlewares/protectRoute.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import { returnBorrowingService } from "../services/borrowService.js";
const router = express.Router()
router.get("/users/:id",protectRoute,getUsersByBookId);

router.post("/book",protectRoute,authorizeRoles('LIBRARIAN'),addBookBorrowing);

router.get("/books/:id",protectRoute,authorizeRoles('LIBRARIAN','ADMIN'),getBooksByUserId);

router.put("/book",protectRoute,authorizeRoles('LIBRARIAN'),returnBookBorrowing)
router.get("/book-history/:id",protectRoute,authorizeRoles('LIBRARIAN'),getBookHistoryByBookId)
router.get("/",protectRoute,authorizeRoles('LIBRARIAN'),getAllBorrowingsWithDetails)

router.get("/active",protectRoute,authorizeRoles('LIBRARIAN'),getActiveBorrowingsWithDetails)
export default router;