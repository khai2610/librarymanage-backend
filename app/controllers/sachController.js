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
    const db = getDb();
    const { MaSach } = req.params;
    const updateFields = req.body;

    // Kiểm tra nếu không có thông tin cần cập nhật
    if (!updateFields || Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'Không có thông tin cập nhật!' });
    }

    // Tìm tài liệu trước khi cập nhật
    const sach = await db.collection('Sach').findOne({ MaSach });

    // Nếu không tìm thấy sách
    if (!sach) {
      return res.status(404).json({ message: 'Không tìm thấy sách với mã này!' });
    }

    // Cập nhật tài liệu
    await db.collection('Sach').updateOne(
      { MaSach }, // Điều kiện tìm kiếm
      { $set: updateFields } // Dữ liệu cần cập nhật
    );

    // Lấy tài liệu đã được cập nhật
    const updatedSach = await db.collection('Sach').findOne({ MaSach });

    res.status(200).json(updatedSach); // Trả về tài liệu đã cập nhật
  } catch (error) {
    res.status(500).json({ message: error.message });
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
};
