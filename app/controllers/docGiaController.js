const { getDb } = require('../config/database'); // Lấy kết nối MongoDB

// Lấy danh sách tất cả độc giả
const getAllDocGia = async (req, res, next) => {
  try {
    const db = getDb();
    const docGiaList = await db.collection('DocGia').find().toArray(); // Truy vấn collection 'DocGia'
    res.status(200).json(docGiaList);
  } catch (error) {
    next(error);
  }
};

// Tạo mới một độc giả
const createDocGia = async (req, res, next) => {
  try {
    const db = getDb();
    const result = await db.collection('DocGia').insertOne(req.body); // Thêm document mới
    res.status(201).json(result.ops[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllDocGia, createDocGia };

