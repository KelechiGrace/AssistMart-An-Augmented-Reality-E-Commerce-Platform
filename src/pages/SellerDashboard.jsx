import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [arStats, setArStats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));

    fetch("http://localhost:5000/ar-stats")
      .then(res => res.json())
      .then(data => setArStats(data))
      .catch(err => console.error(err));
  }, []);

  const totalProducts = products.length;

  const totalTryOns = arStats.reduce(
    (sum, item) => sum + item.try_on_count,
    0
  );

  const totalCartAdds = arStats.reduce(
    (sum, item) => sum + (item.added_to_cart_after_ar || 0),
    0
  );

  
  const cartAddData = {
    labels: arStats.map(stat => `Product ${stat.product_id}`),
    datasets: [
      {
        label: "AR Try-Ons",
        data: arStats.map(stat => stat.try_on_count),
        backgroundColor: "#6A0DAD",
      },
    ],
  };

  
  const arImpactData = {
    labels: ["AR Try-Ons", "No Interaction"],
    datasets: [
      {
        data: [totalTryOns, totalProducts * 5 - totalTryOns || 1],
        backgroundColor: ["#6A0DAD", "#E5E7EB"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-60 bg-purple-700 text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-6">AssistMart</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/seller-dashboard" className="px-4 py-2 hover:bg-purple-800 rounded">
            Dashboard
          </Link>
          <Link to="/seller/products" className="px-4 py-2 hover:bg-purple-800 rounded">
            Product List
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Seller Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Products" value={totalProducts} />
          <StatCard title="AR Try-Ons" value={totalTryOns} />
          <StatCard title="Cart Adds After AR" value={totalCartAdds} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4">AR Try-Ons Per Product</h2>
            <Bar data={cartAddData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4">AR Engagement</h2>
            <Doughnut data={arImpactData} />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow text-center">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <p className="text-2xl font-bold text-purple-700">{value}</p>
    </div>
  );
}