const express = require('express');
const router = express.Router();
const {
  createSach,
  getAllSach,
  updateSach,
  deleteSach,
  getSachById
} = require('../controllers/sachController');

router.get('/', getAllSach);
router.post('/', createSach);
router.put('/:MaSach', updateSach);
router.delete('/:MaSach', deleteSach);
router.get('/:MaSach', getSachById);

module.exports = router;
