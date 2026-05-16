import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then(() => {
        alert("Product updated!");
        navigate("/seller/products");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <h1 className="absolute top-6 left-6 text-4xl font-bold text-purple-700">
        AssistMart
      </h1>
      
      <main className="flex flex-1 items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-center">
            Edit Product
          </h1>
          {/* Name */}
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Description */}
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full mb-3 p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            Update Product
          </button>
        </form>
      </main>
    </div>
  );
}