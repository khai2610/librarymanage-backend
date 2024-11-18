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
router.get('/:MSNV', getNhanVienById); // Lấy thông tin nhân viên theo MSNV
router.put('/:MSNV', updateNhanVien); // Cập nhật thông tin nhân viên
router.delete('/:MSNV', deleteNhanVien); // Xóa nhân viên

module.exports = router;
