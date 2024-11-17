const express = require('express');
const { getAllDocGia, createDocGia } = require('../controllers/docGiaController');
const router = express.Router();

router.get('/', getAllDocGia); // Lấy danh sách độc giả
router.post('/', createDocGia); // Tạo mới độc giả

module.exports = router;
