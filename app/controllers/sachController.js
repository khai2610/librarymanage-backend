const { getDb } = require('../config/database');

// Thêm mới sách
const createSach = async (req, res) => {
  try {
    const db = getDb();
    const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGoc } = req.body;

    // Kiểm tra thông tin đầu vào
    if (!MaSach || !TenSach || !DonGia || !SoQuyen || !NamXuatBan || !MaNXB || !NguonGoc) {
      return res.status(400).json({ message: 'Thông tin không đầy đủ!' });
    }

    // Tạo đối tượng sách mới
    const newSach = {
      MaSach,
      TenSach,
      DonGia,
      SoQuyen,
      NamXuatBan,
      MaNXB,
      NguonGoc,
    };

    // Thêm vào collection Sach
    await db.collection('Sach').insertOne(newSach);
    res.status(201).json(newSach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách sách
const getAllSach = async (req, res) => {
  try {
    const db = getDb();
    const sachList = await db.collection('Sach').find().toArray();
    res.status(200).json(sachList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin sách
const updateSach = async (req, res) => {
  try {
    const { MaSach } = req.params; // Lấy mã sách từ URL
    const updateData = req.body; // Dữ liệu gửi từ frontend

    console.log("Updating book:", MaSach, updateData); // Log dữ liệu nhận được

    // Kiểm tra nếu không có dữ liệu
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided for update." });
    }

    const db = getDb(); // Kết nối MongoDB
    const result = await db.collection("Sach").updateOne(
      { MaSach },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({ message: "Book updated successfully." });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};

// Lấy thông tin sách theo MaSach
const getSachById = async (req, res, next) => {
  try {
    const db = getDb();
    const MaSach = req.params.MaSach;  // Lấy MaSach từ tham số URL
    const book = await db.collection('Sach').findOne({ MaSach });

    if (!book) {
      return res.status(404).json({ message: 'Sách không tồn tại!' });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// Xóa sách
const deleteSach = async (req, res) => {
  try {
    const db = getDb();
    const { MaSach } = req.params;

    // Xóa sách theo MaSach
    const result = await db.collection('Sach').deleteOne({ MaSach });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sách với mã này!' });
    }

    res.status(200).json({ message: 'Xóa sách thành công!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSach,
  getAllSach,
  updateSach,
  deleteSach,
  getSachById
};
