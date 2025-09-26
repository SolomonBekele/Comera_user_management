import express from "express"
import {addBookBorrowing, getBooksByUserId,getUsersByBookId } from "../controllers/borrowController.js"
import protectRoute from "../middlewares/protectRoute.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
const router = express.Router()
router.get("/users/:id",protectRoute,getUsersByBookId);

router.post("/book",protectRoute,authorizeRoles('LIBRARIAN'),addBookBorrowing);

router.get("/books/:id",protectRoute,authorizeRoles('LIBRARIAN','ADMIN'),getBooksByUserId);

export default router;