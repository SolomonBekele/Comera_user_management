import jwt from "jsonwebtoken";
import { getUserByIdService } from "../services/userService.js";


const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token ==="null") {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByIdService(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found or invalid token" });
    }
    const {password,...userWithoutPassword}= user;

    req.user = userWithoutPassword;
    next();

  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error",error:error.message });
  }
};

export default protectRoute;