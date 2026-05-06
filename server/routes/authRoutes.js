const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// hardcoded user
const USER = {
  email: "admin@example.com",
  password: "password123"
};

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    const token = jwt.sign(
      { email: USER.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials!" });
});

module.exports = router;