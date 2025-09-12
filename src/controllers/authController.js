import { getUserByEmailService } from "../services/userService.js";
import argon2 from "argon2"
import {generateAccessToken,generateRefreshToken,verifyToken} from "../utils/generateToken.js";
import { signUpService } from "../services/authService.js";


export const signUp = async (req, res, next) => {
     const {
      first_name,
      last_name,
      password,
      email,
      role,
      language
    } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = await getUserByEmailService(email);
    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }
  try {
    let role1 = role.toUpperCase()
    let status = ""
    if(role1 === "LIBRARIAN") status = "PENDING"
    else status = "APPROVED"

    const createdUser = await signUpService(first_name,last_name,email,hashedPassword,role1,language,status);
    
    const { password, ...userWithoutPassword } = createdUser;

    res.status(200).json({
        success:true,
        message:"user registered successfully",
        data:userWithoutPassword
    })

  } catch (err) {
    console.log("Registration error occured", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
    try {
        const  {email} = req.body;

        const user = await getUserByEmailService(email);
        if (!user) {
          return res
            .status(400)
            .json({ error: "email or password not correct" });
        }

        const isPasswordCorrect = await argon2.verify(user?.password,req.body.password)

        if (!user || !isPasswordCorrect  ) {
            return res.status(400).json({ error: "email or password not correct" });
        }

        const { password, ...userWithoutPassword } = user;
        const token = generateAccessToken(user.id,user.language)
      
        const refreshToken = generateRefreshToken(user.id,user.languagex);
        res.status(200).json({
            success: true,
            message: "you are Logged successfully",
            id:user.id,
            token,
            refreshToken,
          });

    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const logout = (req, res) => {

  res.json({ message: "Logged out successfully." });
};

export const refreshToken =  (req, res) => {
  const token = req.body.refreshToken;
  if (!token) return res.status(401).json({ message: "No token provided" });

  const payload = verifyToken(token, process.env.REFRESH_SECRET);
  if (!payload) return res.status(403).json({ message: "Invalid token" });

  const newAccessToken = generateAccessToken(payload.userId);
  res.json({ token: newAccessToken });
};
