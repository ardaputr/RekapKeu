const jwt = require("jsonwebtoken");
const SECRET = "rahasia_jangan_bocor"; // Samakan dengan SECRET di userController.js

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  // Format token: "Bearer tokenstring"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Token yang valid akan mendekodekan informasi user
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token tidak valid atau kadaluarsa" });
  }
};
