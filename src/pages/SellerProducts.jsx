import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white p-6">
        <h1 className="text-2xl font-bold">AssistMart</h1>
        <nav className="mt-6 flex flex-col gap-2">
          <Link to="/seller-dashboard" className="px-4 py-2 hover:bg-purple-800 rounded">
            Dashboard
          </Link>
          <Link to="/seller/products" className="px-4 py-2 hover:bg-purple-800 rounded">
            Manage Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Manage Products</h1>

        <table className="w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name (according to ID number)</th>
              <th className="text-left">Price</th>
              <th className="text-left">Category</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td>₦{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <Link
                    to={`/seller/edit/${p.id}`}
                    className="text-purple-700 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}