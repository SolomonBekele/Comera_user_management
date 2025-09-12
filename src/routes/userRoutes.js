import express from "express";
import { changeLibrarianStatus, changePassword, deleteUserById, getAllUsers, getUserById, getUserByRole, getUserByToken, updateUserById } from "../controllers/userControllers.js";
import protectRoute from "../middlewares/protectRoute.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import checkIdMatcher from "../middlewares/checkIdMatcher.js";

const router = express.Router()

// Get all users - Admin only
router.get('/', protectRoute, authorizeRoles('admin'), getAllUsers);

// Get a single user by ID - Only accessible by user themselves or admin
router.get('/:id', protectRoute, checkIdMatcher, getUserById);

// Get the currently authenticated user's information based on their token
router.get('/self/token', protectRoute, getUserByToken);

// Update a user's information by ID - Only accessible by user themselves or admin
router.put('/:id', protectRoute, checkIdMatcher, updateUserById);

// Delete a user by ID - Admin only
router.delete('/:id', protectRoute, authorizeRoles('admin'), deleteUserById);

// Change a user's password by ID - Only accessible by the user themselves
router.put('/password/:id', checkIdMatcher, protectRoute, changePassword);

// Change the status of a librarian (e.g., approve or suspend) - Admin only
router.put("/librarians/:id/status", protectRoute, authorizeRoles('admin'), changeLibrarianStatus);

// Get all users by role (e.g., 'user' or 'librarian') - Admin only
router.get("/role/:role", protectRoute, authorizeRoles('admin'), getUserByRole);

export default router;