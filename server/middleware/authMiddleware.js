const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("Cookies =>", req.cookies);
    console.log("Headers =>", req.headers);

    let token = null;

    // Cookie se token
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Authorization Header se token
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Found",
      });
    }
    console.log("Step 1 - Token Found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("Step 2 - Decoded:", decoded);
    const user = await User.findById(decoded.id).select("-password");
console.log("Step 3 - User:", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
if (user.isBlocked) {
  return res.status(403).json({
    success: false,
    message: "Your account has been blocked by admin.",
  });
}
    req.user = user;
console.log("Step 4 - Next");
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};