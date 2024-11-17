const express = require('express');
const routes = require('./app/routes'); // Kết nối tới file index.js trong thư mục routes

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

module.exports = app; // Xuất module để sử dụng trong server.js
