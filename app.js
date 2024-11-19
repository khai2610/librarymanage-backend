const express = require('express');
const routes = require('./app/routes'); // Kết nối tới file index.js trong thư mục routes
const loggerMiddleware = require('./app/middlewares/loggerMiddleware');
const authMiddleware = require('./app/middlewares/authMiddleware');
const cors = require("cors");

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(loggerMiddleware); // Ghi log tất cả các request

// Routes
app.use('/api', routes);
app.use('/api/public', routes);
app.use('/api/secure', authMiddleware, routes);

module.exports = app; // Xuất module để sử dụng trong server.js
