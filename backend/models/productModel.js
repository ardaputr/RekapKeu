const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  nama_produk: { type: DataTypes.STRING, allowNull: false },
  harga: { type: DataTypes.INTEGER, allowNull: false },
  deskripsi: { type: DataTypes.TEXT },
  foto: { type: DataTypes.STRING }, // nama file foto, simpan path relatif
}, {
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;
