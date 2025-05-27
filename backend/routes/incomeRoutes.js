const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

router.post('/income', incomeController.createIncome);
router.get('/income', incomeController.getAllIncome);
router.put('/income/:id', incomeController.updateIncome);
router.delete('/income/:id', incomeController.deleteIncome);

module.exports = router;
