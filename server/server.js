const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// lead routes
const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

// auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// note routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));