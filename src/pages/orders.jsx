//view orders page; orders that have just been checked out
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-gray-500">No orders yet</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow rounded-lg p-4 mb-6"
        >
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Order ID: {order.id}</p>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>

          <p className="text-sm text-purple-700 mb-2">
            Status: {order.status}
          </p>

          {/* ITEMS */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b py-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₦{item.price * item.quantity}
              </p>
            </div>
          ))}

          {/* TOTAL */}
          <div className="text-right mt-3 font-bold">
            Total: ₦{order.total}
          </div>
        </div>
      ))}
    </div>
  );
}


















