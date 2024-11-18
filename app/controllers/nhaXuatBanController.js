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

// Cập nhật thông tin nhà xuất bản
const updateNhaXuatBan = async (req, res, next) => {
  try {
    const db = getDb();
    const { MaNXB } = req.params; // Lấy MaNXB từ URL
    const { TenNXB, DiaChi } = req.body; // Dữ liệu cần cập nhật

    if (!MaNXB) {
      return res.status(400).json({ message: 'Thiếu MaNXB trong yêu cầu!' });
    }

    // Kiểm tra nhà xuất bản tồn tại
    const existingNXB = await db.collection('NhaXuatBan').findOne({ MaNXB });
    if (!existingNXB) {
      return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản!' });
    }

    // Cập nhật thông tin
    const updatedData = {
      ...(TenNXB && { TenNXB }),
      ...(DiaChi && { DiaChi }),
    };

    await db.collection('NhaXuatBan').updateOne({ MaNXB }, { $set: updatedData });

    // Truy vấn lại thông tin sau cập nhật
    const updatedNXB = await db.collection('NhaXuatBan').findOne({ MaNXB });
    res.status(200).json(updatedNXB);
  } catch (error) {
    next(error);
  }
};

// Xóa nhà xuất bản
const deleteNhaXuatBan = async (req, res, next) => {
  try {
    const db = getDb();
    const { MaNXB } = req.params; // Lấy MaNXB từ URL

    if (!MaNXB) {
      return res.status(400).json({ message: 'Thiếu MaNXB trong yêu cầu!' });
    }

    // Kiểm tra tồn tại
    const existingNXB = await db.collection('NhaXuatBan').findOne({ MaNXB });
    if (!existingNXB) {
      return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản!' });
    }

    // Xóa nhà xuất bản
    await db.collection('NhaXuatBan').deleteOne({ MaNXB });
    res.status(200).json({ message: 'Xóa nhà xuất bản thành công!' });
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin nhà xuất bản theo MaNXB
const getNhaXuatBanById = async (req, res, next) => {
  try {
    const db = getDb();
    const { MaNXB } = req.params; // Lấy MaNXB từ URL

    if (!MaNXB) {
      return res.status(400).json({ message: 'Thiếu MaNXB trong yêu cầu!' });
    }

    // Truy vấn nhà xuất bản
    const nhaXuatBan = await db.collection('NhaXuatBan').findOne({ MaNXB });
    if (!nhaXuatBan) {
      return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản!' });
    }

    res.status(200).json(nhaXuatBan);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createNhaXuatBan,
  getAllNhaXuatBan,
  getNhaXuatBanById,
  deleteNhaXuatBan,
  updateNhaXuatBan
};
