const express = require('express');
const {
  createMuonSach,
  getAllMuonSach,
  getMuonSachByDocGia,
  updateMuonSach,
  deleteMuonSach,
} = require('../controllers/theodoimuonsachController');

const router = express.Router();

// Định nghĩa các endpoint
router.post('/', createMuonSach); // Thêm mới phiếu mượn sách
router.get('/', getAllMuonSach); // Lấy danh sách tất cả phiếu mượn sách
router.get('/:MaDocGia/:MaSach', getMuonSachByDocGia); // Lấy phiếu mượn theo MaDocGia
router.put('/:MaDocGia/:MaSach', updateMuonSach); // Cập nhật phiếu mượn
router.delete('/:MaDocGia/:MaSach', deleteMuonSach); // Xóa phiếu mượn sách

module.exports = router;
