const express = require("express");
const router = express.Router();
const db = require("../database");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// Add note to a lead
router.post("/", (req, res) => {
  const { leadId, content } = req.body;
  const createdBy = req.user.email;

  const sql = `
    INSERT INTO notes (leadId, content, createdBy)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [leadId, content, createdBy], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

// Get notes for a lead
router.get("/:leadId", (req, res) => {
  const sql = `
    SELECT * FROM notes
    WHERE leadId = ?
    ORDER BY createdAt DESC
  `;

  db.all(sql, [req.params.leadId], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;