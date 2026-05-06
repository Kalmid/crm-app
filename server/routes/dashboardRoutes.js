const express = require("express");
const router = express.Router();
const db = require("../database");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// Dashboard stats
router.get("/", (req, res) => {
  const sql = `SELECT * FROM leads`;

  db.all(sql, [], (err, leads) => {
    if (err) return res.status(500).json(err);

    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === "New").length;
    const qualifiedLeads = leads.filter(l => l.status === "Qualified").length;
    const wonLeads = leads.filter(l => l.status === "Won").length;
    const lostLeads = leads.filter(l => l.status === "Lost").length;

    const totalValue = leads.reduce((sum, l) => sum + (l.value || 0), 0);

    const wonValue = leads
      .filter(l => l.status === "Won")
      .reduce((sum, l) => sum + (l.value || 0), 0);

    res.json({
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalValue,
      wonValue
    });
  });
});

module.exports = router;