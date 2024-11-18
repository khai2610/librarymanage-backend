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
    const { MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai } = req.body;

    // Kiểm tra xem tất cả trường cần thiết có được cung cấp không
    if (!MaDocGia || !HoLot || !Ten || !NgaySinh || !Phai || !DiaChi || !DienThoai) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
    }

    // Kiểm tra xem MaDocGia đã tồn tại chưa
    const existingDocGia = await db.collection('DocGia').findOne({ MaDocGia });
    if (existingDocGia) {
      return res.status(409).json({ message: 'MaDocGia đã tồn tại!' });
    }

    // Tạo document mới
    const newDocGia = {
      MaDocGia,
      HoLot,
      Ten,
      NgaySinh,
      Phai,
      DiaChi,
      DienThoai,
    };

    // Thêm vào collection DocGia
    const result = await db.collection('DocGia').insertOne(newDocGia);

    // Truy vấn lại document vừa thêm
    const insertedDocGia = await db.collection('DocGia').findOne({ _id: result.insertedId });

    res.status(201).json(insertedDocGia);
  } catch (error) {
    next(error); // Chuyển tiếp lỗi cho middleware xử lý lỗi
  }
};


// Lấy độc giả theo MaDocGia
const getDocGiaById = async (req, res, next) => {
  try {
    const db = getDb();
    const { MaDocGia } = req.params; // Lấy MaDocGia từ URL params

    const docGia = await db.collection('DocGia').findOne({ MaDocGia });

    if (!docGia) {
      return res.status(404).json({ message: 'Không tìm thấy độc giả!' });
    }

    res.status(200).json(docGia);
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin một độc giả
const updateDocGia = async (req, res, next) => {
  try {
    const db = getDb();
    const { MaDocGia } = req.params; // Lấy MaDocGia từ URL
    const { HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai } = req.body; // Lấy thông tin từ body

    // Kiểm tra xem MaDocGia có được cung cấp không
    if (!MaDocGia) {
      return res.status(400).json({ message: 'Thiếu MaDocGia trong yêu cầu!' });
    }

    // Kiểm tra xem MaDocGia có tồn tại trong cơ sở dữ liệu không
    const existingDocGia = await db.collection('DocGia').findOne({ MaDocGia });
    if (!existingDocGia) {
      return res.status(404).json({ message: 'Không tìm thấy độc giả!' });
    }

    // Cập nhật thông tin độc giả
    const updatedData = {
      ...(HoLot && { HoLot }),
      ...(Ten && { Ten }),
      ...(NgaySinh && { NgaySinh }),
      ...(Phai && { Phai }),
      ...(DiaChi && { DiaChi }),
      ...(DienThoai && { DienThoai }),
    };

    const result = await db.collection('DocGia').updateOne(
      { MaDocGia }, // Điều kiện tìm kiếm
      { $set: updatedData } // Cập nhật dữ liệu
    );

    // Truy vấn lại dữ liệu sau khi cập nhật
    const updatedDocGia = await db.collection('DocGia').findOne({ MaDocGia });

    res.status(200).json(updatedDocGia);
  } catch (error) {
    next(error); // Xử lý lỗi
  }
};

// Xóa một độc giả
const deleteDocGia = async (req, res, next) => {
  try {
    const db = getDb();
    const { MaDocGia } = req.params; // Lấy MaDocGia từ URL

    // Kiểm tra xem MaDocGia có được cung cấp không
    if (!MaDocGia) {
      return res.status(400).json({ message: 'Thiếu MaDocGia trong yêu cầu!' });
    }

    // Kiểm tra xem MaDocGia có tồn tại không
    const existingDocGia = await db.collection('DocGia').findOne({ MaDocGia });
    if (!existingDocGia) {
      return res.status(404).json({ message: 'Không tìm thấy độc giả!' });
    }

    // Xóa độc giả khỏi database
    await db.collection('DocGia').deleteOne({ MaDocGia });

    res.status(200).json({ message: 'Xóa độc giả thành công!' });
  } catch (error) {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi
  }
};

module.exports = {
  deleteDocGia,
  updateDocGia, 
  getDocGiaById, 
  getAllDocGia, 
  createDocGia 
};

