// server.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 5000;

// --------------------
// CORS CONFIGURATION
// --------------------
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],  // Only allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cors());
// --------------------
// MIDDLEWARE
// --------------------
app.use(express.json());

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);
// --------------------
// DATABASE CONNECTION
// --------------------
const db = new sqlite3.Database(
  path.join(__dirname, "assistmart.db"),
  (err) => {
    if (err) conpnsole.error("DB connection error:", err.message);
    else console.log("Connected to AssistMart SQLite database");
  }
);



// Get all products
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Product not found" });
    res.json(row);
  });
});

// Add product
app.post("/products", (req, res) => {
  const { name, price, category, description, image_url, ar_supported, type, bodyType, stylingTip } = req.body;

  db.run(
    `INSERT INTO products 
     (name, price, category, description, image_url, ar_supported, type, bodyType, stylingTip)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, price, category, description, image_url, ar_supported || 0, type || null, bodyType || null, stylingTip || null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product added!", id: this.lastID });
    }
  );
});

// Update product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, image_url, ar_supported, type, bodyType, stylingTip } = req.body;

  db.run(
    `UPDATE products 
     SET name=?, price=?, category=?, description=?, image_url=?, ar_supported=?, type=?, bodyType=?, stylingTip=?
     WHERE id=?`,
    [name, price, category, description, image_url, ar_supported || 0, type || null, bodyType || null, stylingTip || null, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product updated!" });
    }
  );
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id=?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted!" });
  });
});

// --------------------
// AR TRY-ON TRACKING
// --------------------
app.post("/ar-tryon/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    `INSERT INTO ar_stats (product_id, try_on_count, added_to_cart_after_ar)
     VALUES (?, 1, 0)
     ON CONFLICT(product_id)
     DO UPDATE SET try_on_count = try_on_count + 1`,
    [id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "AR try-on recorded!" });
    }
  );
});

app.get("/ar-stats", (req, res) => {
  db.all("SELECT * FROM ar_stats", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// --------------------
// START SERVER
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});