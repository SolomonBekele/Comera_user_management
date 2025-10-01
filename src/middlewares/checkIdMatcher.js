import i18n from "../i18n/langConfig.js";
import logger from "../utils/logger.js";

const checkIdMatcher = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Allow if the user is the same as the id
      if (req.user.id === req.params.id) {
        logger.info(`Access granted: user ${req.user.id} matches param id`);
        return next();
      }

      // Allow if the user has any of the allowed roles or is ADMIN
      if (allowedRoles.includes(req.user.role) || req.user.role === 'ADMIN') {
        logger.info(`Access granted: user ${req.user.id} with role ${req.user.role}`);
        return next();
      }

      // Otherwise forbid
      logger.warn(`Access denied: user ${req.user.id} with role ${req.user.role} tried to access id ${req.params.id}`);
      return res.status(403).json({
        success: false,
        message: "Access denied. Unauthorized role.",
      });
    } catch (error) {
      logger.error("Role/id match error", { message: error.message, stack: error.stack });
      return res.status(500).json({
        message: "Internal server error during role authorization.",
      });
    }
  };
};

export default checkIdMatcher;
