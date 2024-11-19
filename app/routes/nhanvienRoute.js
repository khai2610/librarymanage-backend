const express = require('express');
const {
  createNhanVien,
  getAllNhanVien,
  getNhanVienById,
  updateNhanVien,
  deleteNhanVien,
} = require('../controllers/nhanvienController');

const router = express.Router();

router.post('/', createNhanVien); // Thêm mới nhân viên
router.get('/', getAllNhanVien); // Lấy danh sách nhân viên
router.get('/:msnv', getNhanVienById); // Lấy thông tin nhân viên theo msnv
router.put('/:msnv', updateNhanVien); // Cập nhật thông tin nhân viên
router.delete('/:msnv', deleteNhanVien); // Xóa nhân viên

module.exports = router;
