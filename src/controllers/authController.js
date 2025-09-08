import { createUserService, getUserByEmailService } from "../services/userService.js";
import argon2 from "argon2"
import generateToken from "../utils/generateToken.js";


export const signUp = async (req, res, next) => {
     const {
      first_name,
      last_name,
      password,
      email,
    } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = await getUserByEmailService(email);
    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }
  try {


    const createdUser = await createUserService(first_name,last_name,email,hashedPassword,"user");
    
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


        const isPasswordCorrect = await argon2.verify(user.password,req.body.password)

        if (!user || !isPasswordCorrect  ) {
            return res.status(400).json({ error: "Username or password not correct" });
        }

        const { password, ...userWithoutPassword } = user;
        const token = generateToken(user.id)

        res.status(200).json({
            message: "Login successful",
            user: {
              ...userWithoutPassword
            },
            token,
          });

    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const logout = (req, res) => {

  res.json({ message: "Logged out successfully." });
};
