const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Income = sequelize.define('Income', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false }, // foreign key ke users
  sumber: { type: DataTypes.STRING, allowNull: false },   // sumber pemasukan
  tanggal: { type: DataTypes.DATEONLY, allowNull: false }, // format YYYY-MM-DD
  jumlah: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'incomes',
  timestamps: true,
});

module.exports = Income;
