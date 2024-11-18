const express = require('express');
const router = express.Router();
const { createNhaXuatBan, getAllNhaXuatBan } = require('../controllers/nhaXuatBanController');

// Route lấy danh sách nhà xuất bản
router.get('/', getAllNhaXuatBan);

// Route tạo mới nhà xuất bản
router.post('/', createNhaXuatBan);

module.exports = router;
