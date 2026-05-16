import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Product not found (status ${res.status})`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  
  const handleAR = () => {
    if (!product?.id) return;
    navigate(`/ar-tryon/${product.id}`, { state: { product } });
  };

  const handleAddToCart = () => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = existingCart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    existingCart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  alert("Product added to cart!");
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-purple-700">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Product not found</h2>
        <p className="text-gray-600 mb-6">{error || "The requested product could not be loaded."}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-purple-700 hover:underline flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={product.image_url || "https://via.placeholder.com/600x800?text=No+Image"}
            alt={product.name || "Product image"}
            className="w-full rounded-xl shadow-xl object-cover max-h-[600px]"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x800?text=Image+Not+Found";
            }}
          />

           {/* Styling tip for only clothing items*/}
          <div className="mt-4 inline-block px-3 py-1 bg-blue-100 text-grey-500 text-sm font-medium rounded-md  ">
            {product.stylingTip && (
              <p className="mt-1 text-purple-800">
                Styling Tip: {product.stylingTip}
              </p>
            )}
          </div>

          <div>

            {product.ar_supported === 1 && (
              <p className="mt-3 inline-block px-3 py-1 bg-blue-100 text-grey-500 text-sm font-medium rounded-md  ">
                AR Tip: 
                <br/> 
                Allow camera access and hold your phone steady. Make sure the camera is focused on your face for the best experience.
                <br/>
                Use good lighting for the best experience.
            </p>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-3xl font-bold text-green-700 mt-4">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </div>

          {product.description && (
            <div className="prose text-gray-700">
              <p>{product.description}</p>
            </div>
          )}

           

          <div className="flex flex-wrap gap-4 mt-6">
            <button 
            onClick={handleAddToCart}
            className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
              Add to Cart
            </button>

            {product.ar_supported === 1 && (
              <button
                onClick={handleAR}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Try on with AR
              </button>
            )}

            <button
              onClick={() => {
                alert("Purchase simulation: Order placed successfully!");
                navigate("/");
              }}
              className="px-8 py-4 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Category: <span className="font-medium capitalize">{product.category}</span></p>
            {product.ar_supported === 1 && (
              <p className="mt-1 text-purple-600 font-medium">Augmented Reality try-on available</p>
            )}
          </div>
          
          
        </div>
      </div>
    </div>
  );
}