const express = require('express');
const router = express.Router();
const { 
    updateNhaXuatBan, 
    deleteNhaXuatBan,
    getNhaXuatBanById,
    createNhaXuatBan, 
    getAllNhaXuatBan 
} = require('../controllers/nhaXuatBanController');

router.get('/', getAllNhaXuatBan);
router.post('/', createNhaXuatBan);
router.get('/:MaNXB', getNhaXuatBanById);
router.put('/:MaNXB', updateNhaXuatBan);
router.delete('/:MaNXB', deleteNhaXuatBan);

module.exports = router;
