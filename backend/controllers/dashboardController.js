// controller/dashboardController.js
const Income = require('../models/incomeModel');
const Expense = require('../models/expenseModel');
const Product = require('../models/productModel');
const Employee = require('../models/employeeModel');
const { Op } = require('sequelize');

exports.getSummary = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    if (!user_id) return res.status(400).json({ message: "user_id wajib" });

    const today = new Date().toISOString().slice(0, 10);

    // Pendapatan hari ini
    const incomeToday = await Income.sum('jumlah', { where: { user_id, tanggal: today } }) || 0;

    // Total pendapatan
    const totalIncome = await Income.sum('jumlah', { where: { user_id } }) || 0;

    // Pengeluaran hari ini
    const expenseToday = await Expense.sum('jumlah', { where: { user_id, tanggal: today } }) || 0;

    // Total pengeluaran
    const totalExpense = await Expense.sum('jumlah', { where: { user_id } }) || 0;

    // Sisa uang
    const saldo = totalIncome - totalExpense;

    // Total produk
    const totalProducts = await Product.count({ where: { user_id } });

    // Jumlah karyawan
    const totalEmployees = await Employee.count({ where: { user_id } });

    res.json({
      incomeToday,
      totalIncome,
      expenseToday,
      totalExpense,
      saldo,
      totalProducts,
      totalEmployees
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil ringkasan", error: err.message });
  }
};
