// backend/seedProducts.js
const db = require("./db");

const products = [
  {
    id: 1,
    name: "Flowy Midi Dress",
    category: "clothes",
    price: 32000,
    image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    description: "Flowy midi dress for daily wear",
    ar_supported: 0,
    type: null,
    bodyType: "pear",
    stylingTip: "Pair with a nice pair of heels to elongate your legs.",
  },
  {
    id: 2,
    name: "Fitted Blazer",
    category: "clothes",
    price: 28500,
    image_url: "https://images.unsplash.com/photo-1603252109360-909baaf261c7",
    description: "Elegant blazer for office",
    ar_supported: 0,
    type: null,
    bodyType: "hourglass",
    stylingTip: "Pair with high-waist trousers to accentuate your waist.",
  },
  {
    id: 3,
    name: "High-Waist Trousers",
    category: "clothes",
    price: 24000,
    image_url: "https://images.unsplash.com/photo-1603252109360-909baaf261c7",
    description: "High waist trousers",
    ar_supported: 0,
    type: null,
    bodyType: "rectangle",
    stylingTip: "Style with a fitted top to create curves.",
  },
  {
    id: 4,
    name: "Cool Aviator Glasses",
    category: "accessories",
    price: 12000,
    image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    description: "Trendy sunglasses",
    ar_supported: 1,
    type: "glasses",
    bodyType: null,
    stylingTip: null,
  },
  {
    id: 5,
    name: "Golden Hoop Earrings",
    category: "accessories",
    price: 5000,
    image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    description: "Stylish hoop earrings",
    ar_supported: 1,
    type: "earrings",
    bodyType: null,
    stylingTip: null,
  }
];

products.forEach((p) => {
  db.run(
    `INSERT OR IGNORE INTO products
     (id, name, category, price, image_url, description, ar_supported, type, bodyType, stylingTip)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.id, p.name, p.category, p.price, p.image_url, p.description, p.ar_supported, p.type, p.bodyType, p.stylingTip],
    (err) => {
      if (err) console.error("Insert error:", err.message);
    }
  );
});

console.log("Seeded products into database");