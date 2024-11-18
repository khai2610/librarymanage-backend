const express = require('express');
const docGiaRoutes = require('./docgiaRoute');
const nhaXuatBanRoutes = require('./nhaXuatBanRoute');
const sachRoutes = require('./sachRoutes');

const router = express.Router();

router.use('/docgia', docGiaRoutes);
router.use('/nhaxuatban', nhaXuatBanRoutes);
router.use('/sach', sachRoutes);

module.exports = router;
