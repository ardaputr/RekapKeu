const Income = require('../models/incomeModel');

exports.createIncome = async (req, res) => {
  try {
    const { user_id, sumber, tanggal, jumlah } = req.body;
    if (!user_id || !sumber || !tanggal || !jumlah) {
      return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }
    const newIncome = await Income.create({ user_id, sumber, tanggal, jumlah });
    res.status(201).json({ message: 'Pemasukan berhasil ditambahkan.', data: newIncome });
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah pemasukan.', error: err.message });
  }
};

exports.getAllIncome = async (req, res) => {
  try {
    const { user_id } = req.query;
    let incomes;
    if (user_id) {
      incomes = await Income.findAll({ where: { user_id } });
    } else {
      incomes = await Income.findAll();
    }
    res.json({ data: incomes });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data pemasukan.', error: err.message });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { sumber, tanggal, jumlah } = req.body;
    const [updated] = await Income.update({ sumber, tanggal, jumlah }, { where: { id } });
    if (updated) {
      res.json({ message: 'Data pemasukan berhasil diupdate.' });
    } else {
      res.status(404).json({ message: 'Data tidak ditemukan.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal update data.', error: err.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Income.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Data pemasukan berhasil dihapus.' });
    } else {
      res.status(404).json({ message: 'Data tidak ditemukan.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus data.', error: err.message });
  }
};
