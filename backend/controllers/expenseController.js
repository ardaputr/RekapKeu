const Expense = require('../models/expenseModel');

exports.createExpense = async (req, res) => {
  try {
    const { user_id, sumber, tanggal, jumlah } = req.body;
    if (!user_id || !sumber || !tanggal || !jumlah) {
      return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }
    const newExpense = await Expense.create({ user_id, sumber, tanggal, jumlah });
    res.status(201).json({ message: 'Pengeluaran berhasil ditambahkan.', data: newExpense });
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah pengeluaran.', error: err.message });
  }
};

exports.getAllExpense = async (req, res) => {
  try {
    const { user_id } = req.query;
    let expenses;
    if (user_id) {
      expenses = await Expense.findAll({ where: { user_id } });
    } else {
      expenses = await Expense.findAll();
    }
    res.json({ data: expenses });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data pengeluaran.', error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { sumber, tanggal, jumlah } = req.body;
    const [updated] = await Expense.update({ sumber, tanggal, jumlah }, { where: { id } });
    if (updated) {
      res.json({ message: 'Data pengeluaran berhasil diupdate.' });
    } else {
      res.status(404).json({ message: 'Data tidak ditemukan.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal update data.', error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Data pengeluaran berhasil dihapus.' });
    } else {
      res.status(404).json({ message: 'Data tidak ditemukan.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus data.', error: err.message });
  }
};
