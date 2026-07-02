const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user authMiddleware se aata hai
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;