import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Clothes() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) => p.category && p.category.toLowerCase() === "clothes"
        );
        setClothes(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        Clothes Collection
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading clothes...</p>
      ) : clothes.length === 0 ? (
        <p className="text-center text-gray-600">No clothes available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothes.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.image_url || product.image || "https://via.placeholder.com/300"} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-purple-700 font-semibold text-lg line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-green-700 font-bold mt-1">₦{product.price}</p>

                
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}