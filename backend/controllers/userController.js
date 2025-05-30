const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'rahasia_jangan_bocor';

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    res.status(201).json({ message: "Registrasi berhasil." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi error server.", error: error.message });
  }
};

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
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET,
      { expiresIn: '2h' }
    );
    res.json({ message: "Login berhasil.", token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi error server.", error: error.message });
  }
};

// GET user by id (protected route)
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    // pastikan user hanya bisa akses data dirinya sendiri (opsional, bisa ditambah)
    if (parseInt(userId) !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }
    const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email'] });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.json({ data: user });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data user.", error: err.message });
  }
};

// UPDATE user by id (protected route)
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (parseInt(userId) !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }
    const { name, email, password } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password && password.trim() !== '') {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
    }

    await user.save();
    res.json({ message: "Profil berhasil diperbarui." });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui profil.", error: err.message });
  }
};
