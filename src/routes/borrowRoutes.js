import express from "express"
import {addBookBorrowing, getAllBorrowingsWithDetails, getBookHistoryByBookId, getBooksByUserId,getUsersByBookId
    , returnBookBorrowing,getActiveBorrowingsWithDetails,getUsersBorrowCount ,getUserBorrowingsHistory} from "../controllers/borrowController.js"
import protectRoute from "../middlewares/protectRoute.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import checkIdMatcher from "../middlewares/checkIdMatcher.js";
import { returnBorrowingService } from "../services/borrowService.js";
const router = express.Router()
router.get("/users/:id",protectRoute,getUsersByBookId);

router.post("/book",protectRoute,authorizeRoles('LIBRARIAN'),addBookBorrowing);

router.get("/books/:id",protectRoute,checkIdMatcher("LIBRARIAN"),getBooksByUserId);

router.put("/book",protectRoute,authorizeRoles('LIBRARIAN'),returnBookBorrowing)
router.get("/book-history/:id",protectRoute,authorizeRoles('LIBRARIAN'),getBookHistoryByBookId)
router.get("/",protectRoute,authorizeRoles('LIBRARIAN'),getAllBorrowingsWithDetails)

router.get("/active",protectRoute,authorizeRoles('LIBRARIAN'),getActiveBorrowingsWithDetails)
router.get("/active",protectRoute,authorizeRoles('LIBRARIAN'),getActiveBorrowingsWithDetails)
router.get("/count",protectRoute,authorizeRoles('LIBRARIAN'),getUsersBorrowCount)
router.get("/user/history/:id",protectRoute,getUserBorrowingsHistory)
router.get("/user/self-history",protectRoute,getUserBorrowingsHistory)
export default router;