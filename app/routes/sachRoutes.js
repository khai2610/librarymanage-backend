const express = require('express');
const router = express.Router();
const {
  createSach,
  getAllSach,
  updateSach,
  deleteSach,
} = require('../controllers/sachController');

router.get('/', getAllSach);
router.post('/', createSach);
router.put('/:MaSach', updateSach);
router.delete('/:MaSach', deleteSach);

module.exports = router;
