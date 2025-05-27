// controller/dashboardController.js
const Income = require('../models/incomeModel');
const Expense = require('../models/expenseModel');
const Product = require('../models/productModel');
const Employee = require('../models/employeeModel');
const { Op } = require('sequelize');

exports.getSummary = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const today = new Date().toISOString().slice(0, 10);

    // Jika user_id tidak diberikan, hitung summary global tanpa filter user_id
    const incomeToday = user_id
      ? (await Income.sum('jumlah', { where: { user_id, tanggal: today } })) || 0
      : (await Income.sum('jumlah', { where: { tanggal: today } })) || 0;

    const totalIncome = user_id
      ? (await Income.sum('jumlah', { where: { user_id } })) || 0
      : (await Income.sum('jumlah')) || 0;

    const expenseToday = user_id
      ? (await Expense.sum('jumlah', { where: { user_id, tanggal: today } })) || 0
      : (await Expense.sum('jumlah', { where: { tanggal: today } })) || 0;

    const totalExpense = user_id
      ? (await Expense.sum('jumlah', { where: { user_id } })) || 0
      : (await Expense.sum('jumlah')) || 0;

    const saldo = totalIncome - totalExpense;

    const totalProducts = user_id
      ? await Product.count({ where: { user_id } })
      : await Product.count();

    const totalEmployees = user_id
      ? await Employee.count({ where: { user_id } })
      : await Employee.count();

    res.json({
      incomeToday,
      totalIncome,
      expenseToday,
      totalExpense,
      saldo,
      totalProducts,
      totalEmployees,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil ringkasan", error: err.message });
  }
};
