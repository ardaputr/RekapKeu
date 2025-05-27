const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/employee', employeeController.createEmployee);
router.get('/employee', employeeController.getAllEmployees);
router.put('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;
