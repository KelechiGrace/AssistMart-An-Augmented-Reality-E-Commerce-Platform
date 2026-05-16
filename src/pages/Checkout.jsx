import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const totalAmount = location.state?.totalAmount || 0;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const { name, email, phone, address } = form;

    if (!name || !email || !phone || !address) {
      alert("Please fill all required fields");
      return;
    }

    // simulate payment
    setTimeout(() => {
      navigate("/order-success");
    }, 1500);
  };

  return (
    
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
       
      {/* LEFT: FORM */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

        <div className="flex flex-col gap-3">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="p-2 border rounded" />
          <input name="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded" />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} className="p-2 border rounded" />
          <input name="address" placeholder="Address" onChange={handleChange} className="p-2 border rounded" />
          <input name="city" placeholder="City" onChange={handleChange} className="p-2 border rounded" />
          <input name="state" placeholder="State" onChange={handleChange} className="p-2 border rounded" />
        </div>
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between">
          <span>Items:</span>
          <span>{cartItems.length}</span>
        </div>

        <div className="flex justify-between font-semibold mt-2">
          <span>Total:</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-500 transition"
        >
          Place Order
        </button>

        <p className="text-sm text-gray-500 mt-2 text-center">
          🔒 Secure Checkout
        </p>
      </div>

      <div>
        <h3 className="mt-4 text-purple-500 font-semibold">Payment Method</h3>

            <select className="p-2 border rounded w-full mt-2">
            <option>Pay on Delivery</option>
            <option>Card Payment </option>
            <option>Bank Transfer </option>
            </select>
      </div>
    </div>
  );
};

export default Checkout;