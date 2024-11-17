const app = require('./app');
const { connectDB } = require('./app/config/database');

const PORT = process.env.PORT || 3000;

// Kết nối MongoDB và chạy server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
