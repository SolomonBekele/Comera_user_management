import jwt from "jsonwebtoken";
import { getUserByIdService } from "../services/userService.js";
import i18n from "../i18n/langConfig.js";
import logger from "../utils/logger.js";

const validateLibrarianStatus = (librarian) => {
  if (librarian.status === "PENDING") {
    return { valid: false, message: i18n.__("LIBRARIAN.LIBRARIAN_PENDING") };
  }
  if (librarian.status === "NOT VERIFIED") {
    return { valid: false, message: i18n.__("LIBRARIAN.LIBRARIAN_NOT_VERIFIED") };
  }
  return { valid: true };
};

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || token === "null") {
      logger.warn("Unauthorized access attempt: No token provided");
      return res.status(401).json({ error: i18n.__("UNAUTHORIZED_NO_TOKEN") });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByIdService(decoded.userId);

    if (!user) {
      logger.warn(`Invalid token: user not found for ID ${decoded.userId}`);
      return res.status(404).json({ error: i18n.__("INVALID_TOKEN_OR_USER") });
    }

    const { password, ...userWithoutPassword } = user;

    // Set locale based on user language
    if (user.language === "am") i18n.setLocale("am");
    else if (user.language === "ar") i18n.setLocale("ar");
    else i18n.setLocale("en");

    // Validate librarian status
    if (user.role === "LIBRARIAN") {
      const validation = validateLibrarianStatus(user);
      if (!validation.valid) {
        logger.warn(`Librarian access denied for user ${user.id}: ${validation.message}`);
        return res.status(403).json({ error: validation.message });
      }
    }

    req.user = userWithoutPassword;
    logger.info(`Route access granted for user ${user.id}, role ${user.role}`);
    next();

  } catch (error) {
    logger.error("Error in protectRoute middleware", { message: error.message, stack: error.stack });
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default protectRoute;
