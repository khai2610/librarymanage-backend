const express = require('express');
const {
    deleteDocGia, 
    updateDocGia, 
    getDocGiaById, 
    getAllDocGia, 
    createDocGia 
} = require('../controllers/docGiaController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/',  getAllDocGia); // Lấy danh sách độc giả
router.post('/', createDocGia); // Tạo mới độc giả
router.get('/:MaDocGia', getDocGiaById);
router.put('/:MaDocGia', updateDocGia);
router.delete('/:MaDocGia', deleteDocGia);

module.exports = router;
