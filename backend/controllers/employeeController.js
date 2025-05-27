const Employee = require('../models/employeeModel');

exports.createEmployee = async (req, res) => {
  try {
    const { user_id, nama, posisi, alamat, umur, kontak } = req.body;
    if (!user_id || !nama || !posisi) {
      return res.status(400).json({ message: 'Field wajib: user_id, nama, posisi' });
    }
    const newEmployee = await Employee.create({ user_id, nama, posisi, alamat, umur, kontak });
    res.status(201).json({ message: 'Karyawan berhasil ditambahkan.', data: newEmployee });
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah karyawan.', error: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const { user_id } = req.query;
    let employees;
    if (user_id) {
      employees = await Employee.findAll({ where: { user_id } });
    } else {
      employees = await Employee.findAll();
    }
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data karyawan.', error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, posisi, alamat, umur, kontak } = req.body;
    const [updated] = await Employee.update({ nama, posisi, alamat, umur, kontak }, { where: { id } });
    if (updated) {
      res.json({ message: 'Data karyawan berhasil diupdate.' });
    } else {
      res.status(404).json({ message: 'Data tidak ditemukan.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal update data.', error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Data karyawan berhasil dihapus.' });
    } else {
      res.status(404).json({ message: 'Data tidak ditemukan.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus data.', error: err.message });
  }
};
