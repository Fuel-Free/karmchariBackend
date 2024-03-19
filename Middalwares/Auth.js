const jwt = require("jsonwebtoken");

function Auth(req, res, next) {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(400).json({
        message: "Token not valid",
      });
    }
  }
  if (!token) {
    res.status(500).json({
      success: "failure",
      message: "Unauthorized user No token",
    });
  }
}

module.exports = Auth
