import express from "express"
import { login, logout, refreshToken, signUp } from "../controllers/authController.js"
import { validateCreateUser, validateLoginUser } from "../middlewares/inputValidation.js";
import { validateDTO } from "../dto/validateDto.js";
import { createUserDTO, loginUserDTO } from "../dto/userDto.js";

const router = express.Router()

router.post('/',validateDTO(createUserDTO),signUp);
router.post('/login',validateDTO(loginUserDTO),login)
router.post('/logout',logout)
router.post('/refresh',refreshToken)

export default router;