const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./assistmart.db", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to AssistMart database.");
});

db.all("SELECT * FROM products", [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log("Products in DB:", rows);
  db.close();
});