const { getDb } = require('../config/database');

// Tạo nhà xuất bản mới
const createNhaXuatBan = async (req, res) => {
  try {
    const db = getDb();

    // Lấy thông tin từ request body
    const { MaNXB, TenNXB, DiaChi } = req.body;

    // Kiểm tra các trường thông tin có đầy đủ không
    if (!MaNXB || !TenNXB || !DiaChi) {
      return res.status(400).json({ message: 'Thông tin không đầy đủ!' });
    }

    // Tạo đối tượng nhà xuất bản mới
    const newNXB = {
      MaNXB,
      TenNXB,
      DiaChi,
    };

    // Thêm vào collection NhaXuatBan
    await db.collection('NhaXuatBan').insertOne(newNXB);
    res.status(201).json(newNXB);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách nhà xuất bản
const getAllNhaXuatBan = async (req, res) => {
  try {
    const db = getDb();
    const nhaXuatBanList = await db.collection('NhaXuatBan').find().toArray();
    res.status(200).json(nhaXuatBanList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNhaXuatBan,
  getAllNhaXuatBan,
};
