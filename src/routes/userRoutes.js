import express from "express";
import { changePassword, deleteUserById, getAllUsers, getUserById, updateUserById } from "../controllers/userControllers.js";
import protectRoute from "../middlewares/protectRoute.js";
import authorizeRoles from "../middlewares/authorizeRole.js";
import checkIdMatcher from "../middlewares/checkIdMatcher.js";

const router = express.Router()

// Get all users
router.get('/',protectRoute,authorizeRoles('admin'),getAllUsers);
router.get('/:id',protectRoute,checkIdMatcher,getUserById);
router.put('/:id',protectRoute,checkIdMatcher,updateUserById);
router.delete('/:id',protectRoute,authorizeRoles('admin'),deleteUserById);
router.put('/password/:id',checkIdMatcher,protectRoute,changePassword);

export default router;