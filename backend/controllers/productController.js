const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.uploadMiddleware = upload.single('foto');

exports.createProduct = async (req, res) => {
  try {
    const { user_id, nama_produk, harga, deskripsi } = req.body;
    const foto = req.file ? req.file.filename : null;

    if (!user_id || !nama_produk || !harga) {
      return res.status(400).json({ message: 'Field wajib: user_id, nama_produk, harga' });
    }

    const newProduct = await Product.create({ user_id, nama_produk, harga, deskripsi, foto });
    res.status(201).json({ message: 'Produk berhasil ditambahkan.', data: newProduct });
  } catch (err) {
    console.error('Error createProduct:', err);
    res.status(500).json({ message: 'Gagal tambah produk.', error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { user_id } = req.query;
    let products;
    if (user_id) {
      products = await Product.findAll({ where: { user_id } });
    } else {
      products = await Product.findAll();
    }
    res.json({ data: products });
  } catch (err) {
    console.error('Error getAllProducts:', err);
    res.status(500).json({ message: 'Gagal mengambil data produk.', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, nama_produk, harga, deskripsi } = req.body;
    let foto;
    if (req.file) {
      foto = req.file.filename;
    }

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan.' });

    product.user_id = user_id || product.user_id;
    product.nama_produk = nama_produk || product.nama_produk;
    product.harga = harga || product.harga;
    product.deskripsi = deskripsi || product.deskripsi;
    if (foto) product.foto = foto;

    await product.save();
    res.json({ message: 'Produk berhasil diperbarui.', data: product });
  } catch (err) {
    console.error('Error updateProduct:', err);
    res.status(500).json({ message: 'Gagal memperbarui produk.', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Produk berhasil dihapus.' });
    } else {
      res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }
  } catch (err) {
    console.error('Error deleteProduct:', err);
    res.status(500).json({ message: 'Gagal menghapus produk.', error: err.message });
  }
};
