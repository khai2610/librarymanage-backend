const { getDb } = require('../config/database');

// Thêm nhân viên mới
const createNhanVien = async (req, res) => {
  try {
    const db = getDb();
    const newNhanVien = req.body;

    // Kiểm tra đầu vào
    // if (!newNhanVien || !newNhanVien.msnv || !newNhanVien.HoTenNV || !newNhanVien.Password) {
    //   return res.status(400).json({ message: 'Thiếu thông tin nhân viên!' });
    // }

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

// Lấy thông tin một nhân viên theo msnv
const getNhanVienById = async (req, res) => {
  try {
    const db = getDb();
    const { msnv } = req.params;
    const nhanvien = await db.collection('NhanVien').findOne({ msnv });

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
    const { msnv } = req.params;
    const updateFields = req.body;

    if (!updateFields || Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'Không có thông tin cập nhật!' });
    }

    const result = await db.collection('NhanVien').updateOne(
      { msnv },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên!' });
    }

    // Sau khi update thành công, chỉ gọi res.json một lần
    const updatedNhanVien = await db.collection('NhanVien').findOne({ msnv });
    return res.status(200).json(updatedNhanVien); // Đảm bảo chỉ gửi phản hồi một lần

  } catch (error) {
    console.error('Error updating employee:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message }); // Đảm bảo không gửi phản hồi nhiều lần
    }
  }
};


// Xóa nhân viên
const deleteNhanVien = async (req, res) => {
  try {
    const db = getDb();
    const { msnv } = req.params;

    const result = await db.collection('NhanVien').deleteOne({ msnv });

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
