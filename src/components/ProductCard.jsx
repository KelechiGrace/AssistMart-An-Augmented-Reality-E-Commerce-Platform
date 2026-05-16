import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleAR = (e) => {
    e.stopPropagation();
    fetch(`http://localhost:5000/ar-tryon/${product.id}`, { method: "POST" })
      .then(() => alert("AR Try-On Recorded!"))
      .catch((err) => {
        console.error(err);
        alert("Failed to record AR try-on");
      });
  };

  const arSupported = product.arSupported === 1 || product.ar_supported === 1;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative flex flex-col justify-between bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer w-[220px] h-[340px]"
    >
      <img
        src={product.image || "https://via.placeholder.com/220x180?text=No+Image"}
        alt={product.name}
        className="w-full h-[180px] object-cover rounded-t-lg"
        onError={(e) => (e.target.src = "https://via.placeholder.com/220?text=Error")}
      />

      <div className="p-3 flex flex-col justify-between flex-1">
        <h3 className="text-md font-semibold line-clamp-2">{product.name}</h3>
        <p className="text-green-700 font-bold mt-1">
          ₦{Number(product.price).toLocaleString()}
        </p>

        <div className="mt-3 flex items-center gap-2">
          {arSupported && (
            <button
              onClick={handleAR}
              className="flex-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
            >
              Try-on available
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="text-red-500 hover:text-red-600 transition"
          >
            {liked ? <SolidHeart className="w-6 h-6" /> : <OutlineHeart className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}