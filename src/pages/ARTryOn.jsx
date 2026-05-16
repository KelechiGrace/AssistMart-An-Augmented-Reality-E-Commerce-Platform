import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ARCamera from "../components/ARCamera";

const ARTryOn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [cameraOn, setCameraOn] = useState(false);

  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "100px", marginTop: "-50px" }}>

      <div style={{ position: "absolute", top: "10px", left: "10px", padding: "10px" }}>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-purple-700 hover:underline flex items-center gap-2"
      >
        ← Back to Product Details
      </button>
      </div>

      {/* LOGO */}
      <h1 style={{ color: "#a855f7", fontWeight: "bold", fontSize: "28px" }}>
        AssistMart
      </h1>

      

      <h2 style={{ marginTop: "20px" }}>
        Try <strong>{product.name}</strong> using Augmented Reality
      </h2>

      {/* PRIVACY MESSAGE */}
      <p style={{ maxWidth: "500px", margin: "10px auto", color: "#555" }}>
        Disclaimer: Your camera is used only for real-time Augmented Reality visualization. 
        No images or videos are stored or sent to any server.
      </p>

      {/* CAMERA CONTROLS */}
      <div style={{ margin: "20px" }}>
        {!cameraOn && (
          <button
            onClick={() => setCameraOn(true)}
            style={{
              padding: "10px 20px",
              background: "#a855f7",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Start Camera
          </button>
        )}

        {cameraOn && (
          <button
            onClick={() => setCameraOn(false)}
            style={{
              padding: "10px 20px",
              background: "black",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Stop Camera
          </button>
        )}
      </div>

      {/* CAMERA COMPONENT */}
      {cameraOn && <ARCamera product={product} />}

    </div>
  );
};

export default ARTryOn;