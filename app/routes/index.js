const express = require('express');
const docGiaRoutes = require('./docgiaRoute');
const nhaXuatBanRoutes = require('./nhaXuatBanRoute');
const sachRoutes = require('./sachRoutes');
const nhanvienRoute = require('./nhanvienRoute');
const theodoimuonsachRoute = require('./theodoimuonsachRoute');

const router = express.Router();

router.use('/docgia', docGiaRoutes);
router.use('/nhaxuatban', nhaXuatBanRoutes);
router.use('/sach', sachRoutes);
router.use('/nhanvien', nhanvienRoute); 
router.use('/theodoimuonsach', theodoimuonsachRoute); 

module.exports = router;
