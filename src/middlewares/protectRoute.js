import jwt from "jsonwebtoken";
import { getUserByIdService } from "../services/userService.js";
import i18n from "../i18n/langConfig.js";

const validateLibrarianStatus = (libraian) => {
  if (libraian.status === "PENDING") {
    return { valid: false, message: i18n.__("LIBRARIAN.LIBRARIAN_PENDING") };
  }
  if (libraian.status === "NOT-VERIFIED") {
    return { valid: false, message: i18n.__("LIBRARIAN.LIBRARIAN_NOT_VERIFIED")};
  }
  return { valid: true };
};


const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token ==="null") {
      return res.status(401).json({ error: i18n.__("UNAUTHORIZED_NO_TOKEN") });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByIdService(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ error: i18n.__("INVALID_TOKEN_OR_USER") });
    }
    const {password,...userWithoutPassword}= user;
    
    if(user.language === "am")i18n.setLocale("am")
    else if(user.language === "ar") i18n.setLocale("ar")
    else i18n.setLocale("en")
    if (user.role === "LIBRARIAN") {
      const validation = validateLibrarianStatus(user);
      if (!validation.valid) {
        return res.status(403).json({ error: validation.message });
      }
    }

    req.user = userWithoutPassword;
    next();

  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error",error:error.message });
  }
};

export default protectRoute;