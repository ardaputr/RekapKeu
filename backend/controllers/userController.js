const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET = "rahasia_jangan_bocor";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email tidak ditemukan." });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Password salah." });
    }

    // Membuat token JWT dengan waktu kedaluwarsa 2 jam
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET,
      { expiresIn: "2h" } // Token berakhir dalam 2 jam
    );

    // Mengirimkan token ke frontend
    res.json({
      message: "Login berhasil.",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi error server.", error: error.message });
  }
};

// Untuk refresh token (jika perlu) - endpoint baru
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token tidak ditemukan" });

  try {
    const decoded = jwt.verify(refreshToken, SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, name: decoded.name },
      SECRET,
      { expiresIn: "2h" }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res
      .status(403)
      .json({ message: "Refresh token tidak valid atau kadaluarsa" });
  }
};
