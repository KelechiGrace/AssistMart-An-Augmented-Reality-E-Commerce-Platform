import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

const bodyTypeInfo = {
  pear: {
    label: "Pear",
    message:
      "These pieces highlight your upper body while balancing the hips."
  },
  hourglass: {
    label: "Hourglass",
    message:
      "These styles highlight your naturally balanced proportions and defined waist."
  },
  rectangle: {
    label: "Rectangle",
    message:
      "These outfits help create curves and add shape to your silhouette."
  },
  inverted_triangle: {
    label: "Inverted Triangle",
    message:
      "These selections soften the shoulders and add balance to the lower body."
  },
  apple: {
    label: "Apple",
    message:
      "These pieces draw attention to your neckline and legs."
  }
};



export default function Recommendations() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const bodyType = localStorage.getItem("bodyType") || "rectangle";
  const info = bodyTypeInfo[bodyType];

  useEffect(() => {
    fetch("http://localhost:5000/products")   
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter(
    (product) => product.bodyType === bodyType
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-purple-700 font-semibold mb-5"
      >
        <ArrowLeftCircle size={18}/> Go to Home
      </button>

      <h1 className="text-4xl text-center font-bold text-purple-700 mb-2">
        Recommended For You
      </h1>

      <p className="text-gray-600 mb-8 text-center">
        Based on your selected body type:
        <span className="font-semibold capitalize"> {info?.label}</span>
      </p>

      <div className="bg-white border-l-4 border-purple-700 p-6 rounded-lg shadow mb-12 max-w-3xl mx-auto">
        <h3 className="font-semibold text-purple-700 mb-2">
          Why you're seeing these
        </h3>
        <p className="text-gray-700">{info?.message}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-xl shadow-md cursor-pointer transition hover:scale-[1.02] hover:shadow-xl"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-80 object-cover rounded-t-xl"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-purple-700 font-bold">₦{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No recommendations found yet for this body type.
        </p>
      )}

      <div className="mt-14 text-center">
        <button
          onClick={() => navigate("/avatarselection")}
          className="text-purple-700 font-semibold hover:underline"
        >
          Change body type
        </button>
      </div>

    </div>
  );
}