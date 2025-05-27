const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Expense = sequelize.define('Expense', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  sumber: { type: DataTypes.STRING, allowNull: false }, 
  tanggal: { type: DataTypes.DATEONLY, allowNull: false },
  jumlah: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'expenses',
  timestamps: true,
});

module.exports = Expense;
