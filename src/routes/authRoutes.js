import express from "express"
import { login, logout, signUp } from "../controllers/authController.js"
import { validateCreateUser, validateLoginUser } from "../middlewares/inputValidation.js";

const router = express.Router()

router.post('/',validateCreateUser,signUp);
router.post('/login',validateLoginUser,login)
router.post('/logout',logout)

export default router;