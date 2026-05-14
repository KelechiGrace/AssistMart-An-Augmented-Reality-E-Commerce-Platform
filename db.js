// backend/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Path to your DB file
const DB_PATH = path.join(__dirname, "assistmart.db");

// Connect to SQLite DB
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error("Error opening database:", err.message);
  else console.log("Connected to AssistMart database.");
});

// Create tables if they don't exist
db.serialize(() => {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      image_url TEXT,
      description TEXT,
      ar_supported INTEGER DEFAULT 0,
      type TEXT,
      bodyType TEXT,
      stylingTip TEXT
    )
  `);

  // AR Try-on stats table
  db.run(`
    CREATE TABLE IF NOT EXISTS ar_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      try_on_count INTEGER DEFAULT 0,
      added_to_cart_after_ar INTEGER DEFAULT 0,
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);

  console.log("Tables ensured: products, ar_stats");
});

module.exports = db;