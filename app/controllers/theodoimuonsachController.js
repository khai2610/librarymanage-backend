const { getDb } = require('../config/database');

// Thêm mới phiếu mượn sách
const createMuonSach = async (req, res) => {
  try {
    const db = getDb();
    const newMuonSach = req.body;

    // Kiểm tra đầu vào
    if (!newMuonSach || !newMuonSach.MaDocGia || !newMuonSach.MaSach || !newMuonSach.NgayMuon) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết!' });
    }

    // Thêm phiếu mượn sách vào cơ sở dữ liệu
    const result = await db.collection('TheoDoiMuonSach').insertOne(newMuonSach);

    res.status(201).json({
      _id: result.insertedId,
      ...newMuonSach,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách tất cả phiếu mượn sách
const getAllMuonSach = async (req, res) => {
  try {
    const db = getDb();
    const muonSachList = await db.collection('TheoDoiMuonSach').find().toArray();
    res.status(200).json(muonSachList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết phiếu mượn theo MaDocGia
const getMuonSachByDocGia = async (req, res) => {
  try {
    const db = getDb();
    const { MaDocGia, MaSach } = req.params;

    // Tìm phiếu mượn sách theo MaDocGia và MaSach
    const muonSach = await db.collection('TheoDoiMuonSach').findOne({ MaDocGia, MaSach });

    if (!muonSach) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu mượn sách!' });
    }

    res.status(200).json(muonSach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật phiếu mượn sách
const updateMuonSach = async (req, res) => {
  try {
    const db = getDb();
    const { MaDocGia, MaSach } = req.params;
    const updateFields = req.body;

    if (!updateFields || Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'Không có thông tin cập nhật!' });
    }

    const result = await db.collection('TheoDoiMuonSach').updateOne(
      { MaDocGia, MaSach },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu mượn sách!' });
    }

    const updatedMuonSach = await db.collection('TheoDoiMuonSach').findOne({ MaDocGia, MaSach });
    res.status(200).json(updatedMuonSach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa phiếu mượn sách
const deleteMuonSach = async (req, res) => {
  try {
    const db = getDb();
    const { MaDocGia, MaSach } = req.params;

    const result = await db.collection('TheoDoiMuonSach').deleteOne({ MaDocGia, MaSach });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu mượn sách!' });
    }

    res.status(200).json({ message: 'Xóa phiếu mượn sách thành công!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMuonSach,
  getAllMuonSach,
  getMuonSachByDocGia,
  updateMuonSach,
  deleteMuonSach,
};
