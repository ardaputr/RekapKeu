const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const productRoutes = require("./routes/productRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const sequelize = require("./config/db");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sinkronisasi database: membuat tabel otomatis jika belum ada
sequelize
  .sync()
  .then(() => {
    console.log("Database & tabel sudah sinkron!");
  })
  .catch((err) => {
    console.error("Gagal sinkronisasi database:", err);
  });

// Routing untuk register & login
// app.use('/', userRoutes);
app.use("/api", userRoutes);
// Routing untuk income (pemasukan)
app.use("/api", incomeRoutes);
// Routing untuk expense (pengeluaran)
app.use("/api", expenseRoutes);
// Routing untuk produk
app.use("/api", productRoutes);
// Jangan lupa serve folder uploads supaya foto bisa diakses
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routing untuk employee (karyawan)
app.use("/api", employeeRoutes);
// Routing untuk dashboard (ringkasan)
app.use("/api", dashboardRoutes);

// Serve file statis frontend (login.html, register.html, dsb)
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
