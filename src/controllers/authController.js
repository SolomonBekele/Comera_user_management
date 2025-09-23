import { getUserByEmailService } from "../services/userService.js";
import argon2 from "argon2"
import {generateAccessToken,generateRefreshToken,verifyToken} from "../utils/generateToken.js";
import { signUpService } from "../services/authService.js";
import i18n from "../i18n/langConfig.js";
import { I18n } from "i18n";


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
    i18n.setLocale(language)
  
    if (user) {
      return res.status(400).json({ error: i18n.__("USER.CONFLICT_EMAIL",{email:email}) });
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
        message:i18n.__('USER.CREATED'),
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
        console.log(user);
        if (!user) {
          return res
            .status(400)
            .json({ error: i18n.__("USER.INVALID_CREDENTIALS") });
        }
        i18n.setLocale(user?.language)
        const isPasswordCorrect = await argon2.verify(user?.password,req.body.password)
        
        if (!user || !isPasswordCorrect  ) {
            return res.status(400).json({ error: i18n.__("USER.INVALID_CREDENTIALS")  });
        }

        const { password, ...userWithoutPassword } = user;

        const token = generateAccessToken(user.id,user.language)
      
        const refreshToken = generateRefreshToken(user.id,user.languagex);
        res.status(200).json({
            success: true,
            message: i18n.__("USER.LOGIN_SUCCESS"),
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

  res.json({ message: i18n.__("USER.LOGOUT_SUCCESS") });
};

export const refreshToken =  (req, res) => {
  const token = req.body.refreshToken;
  if (!token) return res.status(401).json({ message: i18n.__("USER.NO_TOKEN") });

  const payload = verifyToken(token, process.env.REFRESH_SECRET);
  if (!payload) return res.status(403).json({ message: i18n.__("USER.INVALID_TOKEN") });

  const newAccessToken = generateAccessToken(payload.userId);
  res.json({ token: newAccessToken });
};
