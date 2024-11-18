const { getDb } = require('../config/database');

// Thêm nhân viên mới
const createNhanVien = async (req, res) => {
  try {
    const db = getDb();
    const newNhanVien = req.body;

    // Kiểm tra đầu vào
    if (!newNhanVien || !newNhanVien.MSNV || !newNhanVien.HoTenNV || !newNhanVien.Password) {
      return res.status(400).json({ message: 'Thiếu thông tin nhân viên!' });
    }

    // Thêm nhân viên vào cơ sở dữ liệu
    const result = await db.collection('NhanVien').insertOne(newNhanVien);

    // Trả về nhân viên mới tạo
    res.status(201).json({
      _id: result.insertedId, // Lấy ID của tài liệu vừa được chèn
      ...newNhanVien,        // Gộp các thông tin đã gửi vào kết quả trả về
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Lấy danh sách tất cả nhân viên
const getAllNhanVien = async (req, res) => {
  try {
    const db = getDb();
    const nhanviens = await db.collection('NhanVien').find().toArray();
    res.status(200).json(nhanviens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin một nhân viên theo MSNV
const getNhanVienById = async (req, res) => {
  try {
    const db = getDb();
    const { MSNV } = req.params;
    const nhanvien = await db.collection('NhanVien').findOne({ MSNV });

    if (!nhanvien) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên!' });
    }

    res.status(200).json(nhanvien);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin nhân viên
const updateNhanVien = async (req, res) => {
  try {
    const db = getDb();
    const { MSNV } = req.params;
    const updateFields = req.body;

    if (!updateFields || Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'Không có thông tin cập nhật!' });
    }

    const result = await db.collection('NhanVien').updateOne(
      { MSNV },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên!' });
    }

    const updatedNhanVien = await db.collection('NhanVien').findOne({ MSNV });
    res.status(200).json(updatedNhanVien);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa nhân viên
const deleteNhanVien = async (req, res) => {
  try {
    const db = getDb();
    const { MSNV } = req.params;

    const result = await db.collection('NhanVien').deleteOne({ MSNV });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên!' });
    }

    res.status(200).json({ message: 'Xóa nhân viên thành công!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNhanVien,
  getAllNhanVien,
  getNhanVienById,
  updateNhanVien,
  deleteNhanVien,
};
