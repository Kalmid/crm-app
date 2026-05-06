const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./crm.db", (err) => {
  if (err) {
    console.log("DB Error:", err.message);
  } else {
    console.log("SQLite connected");
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      company TEXT,
      email TEXT,
      phone TEXT,
      source TEXT,
      salesperson TEXT,
      status TEXT DEFAULT 'New',
      value INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      leadId INTEGER,
      content TEXT,
      createdBy TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;