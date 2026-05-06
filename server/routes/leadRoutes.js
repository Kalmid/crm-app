const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE lead
router.post("/", (req, res) => {
  const { name, company, email, phone, source, salesperson, status, value } = req.body;

  const sql = `
    INSERT INTO leads (name, company, email, phone, source, salesperson, status, value)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, company, email, phone, source, salesperson, status, value], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

// GET ALL leads
router.get("/", (req, res) => {
  db.all("SELECT * FROM leads", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// GET ONE lead
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM leads WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
});

// UPDATE lead
router.put("/:id", (req, res) => {
  const { name, company, email, phone, source, salesperson, status, value } = req.body;

  const sql = `
    UPDATE leads
    SET name=?, company=?, email=?, phone=?, source=?, salesperson=?, status=?, value=?, updatedAt=CURRENT_TIMESTAMP
    WHERE id=?
  `;

  db.run(sql, [name, company, email, phone, source, salesperson, status, value, req.params.id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ updated: this.changes });
  });
});

// DELETE lead
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM leads WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

module.exports = router;