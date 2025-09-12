function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      try {
        const user = req.user;
          console.log(user.role);
        if (!user || !allowedRoles.includes(user.role)) {
            console.log("Access denied. Unauthorized role.")
          return res.status(403).json({ message: "Access denied. Unauthorized role." });
        }
  
        next(); // Role is allowed, proceed to the route
      } catch (error) {
        console.error("Role authorization error:", error);
        return res.status(500).json({ message: "Internal server error during role authorization." });
      }
    };
  }
  
  export default authorizeRoles;