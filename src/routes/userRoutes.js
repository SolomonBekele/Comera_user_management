import express from "express";

const router = express.Router()

// Get all users
router.get('/',protectRoute,getAllUsers);