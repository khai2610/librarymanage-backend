const express = require('express');
const docGiaRoutes = require('./docgiaRoute');

const router = express.Router();

router.use('/docgia', docGiaRoutes); // Đường dẫn API cho `DocGia`

module.exports = router;
