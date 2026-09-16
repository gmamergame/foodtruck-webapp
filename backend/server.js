const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const pointsRoutes = require("./routes/pointsRoutes");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "FOODTRUCK backend is running.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/points", pointsRoutes);

app.listen(PORT, () => {
  console.log(`FOODTRUCK backend running on http://localhost:${PORT}`);
});