const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "FOODTRUCK backend is running.",
  });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`FOODTRUCK backend running on http://localhost:${PORT}`);
});