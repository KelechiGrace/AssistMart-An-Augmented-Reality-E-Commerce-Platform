import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.category?.toLowerCase() === "accessories"
        );
        setAccessories(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading accessories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        Accessories Collection
      </h1>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">Loading accessories...</p>
        </div>
      ) : accessories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No accessories available at the moment.</p>
          <p className="mt-2 text-gray-500">Check back soon or browse other categories!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {accessories.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[6/4] overflow-hidden bg-gray-100">
                <img
                  src={product.image_url || "https://via.placeholder.com/400x533?text=No+Image"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/400?text=Image+Error")}
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors">
                  {product.name}
                </h3>
                <p className="mt-2 text-xl font-bold text-green-700">
                  ₦{Number(product.price).toLocaleString()}
                </p>
                {product.ar_supported === 1 && (
                  <span className="mt-3 inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Virtual Try-On Available
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}