import logger from "../utils/logger.js";

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !allowedRoles.includes(user.role)) {
        logger.warn(`Access denied for user: ${user?.id || "unknown"}, role: ${user?.role || "none"}`);
        return res.status(403).json({
          success: false,
          message: "Access denied. Unauthorized role."
        });
      }

      logger.info(`Access granted for user: ${user.id}, role: ${user.role}`);
      next(); // Role is allowed, proceed to the route
    } catch (error) {
      logger.error("Role authorization error", { message: error.message, stack: error.stack });
      return res.status(500).json({
        success: false,
        message: "Internal server error during role authorization."
      });
    }
  };
}

export default authorizeRoles;
