const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  nama: { type: DataTypes.STRING, allowNull: false },
  posisi: { type: DataTypes.STRING, allowNull: false },
  alamat: { type: DataTypes.TEXT, allowNull: true },
  umur: { type: DataTypes.INTEGER, allowNull: true },
  kontak: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'employees',
  timestamps: true,
});

module.exports = Employee;
