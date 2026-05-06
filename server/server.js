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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));