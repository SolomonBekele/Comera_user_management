import i18n from "../i18n/langConfig.js";
const checkIdMatcher = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Allow if the user is the same as the id
      if (req.user.id === req.params.id) {
        return next();
      }

      // Allow if the user has any of the allowed roles
      if (allowedRoles.includes(req.user.role) || req.user.role ==  'ADMIN') {
        return next();
      }

      // Otherwise forbid
      return res.status(403).json({
        success: false,
        message: "Access denied. Unauthorized role.",
      });
    } catch (error) {
      console.error("not match with the token:", error);
      return res.status(500).json({
        message: "Internal server error during role authorization.",
      });
    }
  };
};

export default checkIdMatcher;
