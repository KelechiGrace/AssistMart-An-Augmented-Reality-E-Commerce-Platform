import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form"); 
  // "form" → signup/login form
  // "otp" → OTP screen

  const navigate = useNavigate();

  const allowedSellers = ["seller1@example.com", "seller2@example.com"];

  // =========================
  // LOGIN (unchanged for now)
  // =========================
  const handleLogin = (e) => {
    e.preventDefault();

    if (allowedSellers.includes(email)) {
      navigate("/seller-dashboard");
    } else {
      navigate("/");
    }
  };

  // =========================
  // SIGNUP (NEW OTP FLOW)
  // =========================
  const handleSignup = async (e) => {
    e.preventDefault();

    // RETAILER FLOW (no OTP for now)
    if (role === "retailer") {
      if (allowedSellers.includes(email)) {
        navigate("/seller-dashboard");
      } else {
        alert("You are not authorized as a Retailer.");
      }
      return;
    }

    // BUYER FLOW → CALL BACKEND FOR OTP
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP sent to your email");
        setStep("otp"); // show OTP input
      } else {
        alert(data.message || "Error sending OTP");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Verified successfully");
        navigate("/fashionpreference");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">
        AssistMart
      </h1>

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "login"
                ? "border-b-2 border-purple-700 text-purple-700"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("login");
              setStep("form");
            }}
          >
            Login
          </button>

          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "signup"
                ? "border-b-2 border-purple-700 text-purple-700"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("signup");
              setStep("form");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* ================= LOGIN ================= */}
        {activeTab === "login" && (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-4 py-2"
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="border rounded px-4 py-2"
            />

            <button className="bg-purple-700 text-white py-2 rounded">
              Login
            </button>
          </form>
        )}

        {/* ================= SIGNUP FORM ================= */}
        {activeTab === "signup" && step === "form" && (
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-4 py-2"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-4 py-2"
            />

            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="retailer">Retailer</option>
            </select>

            <button className="bg-purple-700 text-white py-2 rounded">
              Sign Up
            </button>
          </form>
        )}

        {/* ================= OTP FORM ================= */}
        {activeTab === "signup" && step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <h2 className="text-center font-semibold text-purple-700">
              Enter OTP sent to your email
            </h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border rounded px-4 py-2 text-center"
            />

            <button className="bg-green-600 text-white py-2 rounded">
              Verify OTP
            </button>
          </form>
        )}

      </div>
    </div>
  );
}