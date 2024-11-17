const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let db; // Biến lưu kết nối database

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();
    db = client.db(); // Lưu kết nối đến database
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Trả về kết nối database
const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { connectDB, getDb };
