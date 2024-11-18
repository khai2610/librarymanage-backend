const express = require('express');
const docGiaRoutes = require('./docgiaRoute');
const nhaXuatBanRoutes = require('./nhaXuatBanRoute');

const router = express.Router();

router.use('/docgia', docGiaRoutes); // Đường dẫn API cho `DocGia`
router.use('/nhaxuatban', nhaXuatBanRoutes);

module.exports = router;
