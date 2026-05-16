import React, { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const ARCamera = ({ product }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  const glassesImg = useRef(new Image());
  const earringImg = useRef(new Image());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    // ✅ LOAD IMAGES ONLY WHEN NEEDED
    if (product?.type?.includes("glasses") && product?.image_url) {
      glassesImg.current.src = product.image_url;
    }

    if (product?.type?.includes("earring") && product?.image_url) {
      earringImg.current.src = product.image_url;
    }

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://unpkg.com/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    faceMesh.onResults((results) => {
      if (!results.image) return;

      setLoading(false);

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 🔁 mirror camera
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(results.image, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();

      if (!results.multiFaceLandmarks?.length) return;

      const landmarks = results.multiFaceLandmarks[0];

      // =========================
      // 👓 GLASSES
      // =========================
      if (
        product?.type?.includes("glasses") &&
        glassesImg.current.complete &&
        glassesImg.current.naturalWidth !== 0
      ) {
        try {
          const leftEye = landmarks[33];
          const rightEye = landmarks[263];

          const x1 = leftEye.x * canvas.width;
          const y1 = leftEye.y * canvas.height;

          const x2 = rightEye.x * canvas.width;
          const y2 = rightEye.y * canvas.height;

          const distance = Math.hypot(x2 - x1, y2 - y1);

          const width = distance * 2.2;
          const height = width * 0.6;

          const centerX = (x1 + x2) / 2;
          const centerY = (y1 + y2) / 2;

          const angle = -Math.atan2(y2 - y1, x2 - x1);

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);

          ctx.drawImage(
            glassesImg.current,
            -width / 2,
            -height / 2,
            width,
            height
          );

          ctx.restore();
        } catch (err) {
          console.log("Glasses error:", err);
        }
      }

      // =========================
      // LIPSTICK 
      // =========================
      if (product?.type?.includes("lipstick")) {
  try {
    const upperLip = [
      61, 185, 40, 39, 37, 0,
      267, 269, 270, 409, 291
    ];

    const lowerLip = [
      61, 146, 91, 181, 84, 17,
      314, 405, 321, 375, 291
    ];

    ctx.save();
    ctx.beginPath();

    // 🔁 IMPORTANT: mirror coordinates
    const mirrorX = (x) => canvas.width - x;

    // 🔴 Upper lip
    upperLip.forEach((i, index) => {
      const p = landmarks[i];
      if (!p) return;

      const x = mirrorX(p.x * canvas.width);
      const y = p.y * canvas.height;

      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    // 🔴 Lower lip
    lowerLip.reverse().forEach((i) => {
      const p = landmarks[i];
      if (!p) return;

      const x = mirrorX(p.x * canvas.width);
      const y = p.y * canvas.height;

      ctx.lineTo(x, y);
    });

    ctx.closePath();

    // 🎨 color
    let color = "rgba(170,20,30,0.5)";

    if (product.type === "lipstick-pink")
      color = "rgba(188,80,120,0.45)";
    else if (product.type === "lipstick-chocolate")
      color = "rgba(123,63,0,0.45)";
    else if (product.type === "lipstick-tangerine")
      color = "rgba(242,133,0,0.45)";
    else if (product.type === "lipstick-wine")
      color = "rgba(128,0,32,0.5)";

    ctx.globalAlpha = 0.55;
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  } catch (err) {
    console.log("Lipstick error:", err);
  }
}

      // =========================
      // 💎 EARRINGS
      // =========================
    if (
  product?.type?.includes("earring") &&
  earringImg.current.complete &&
  earringImg.current.naturalWidth !== 0
) {
  try {
  const leftEye = landmarks[33];
const rightEye = landmarks[263];

const leftJaw = landmarks[234];
const rightJaw = landmarks[454];

// convert to pixel space
const lx = leftEye.x * canvas.width;
const ly = leftEye.y * canvas.height;
const rx = rightEye.x * canvas.width;
const ry = rightEye.y * canvas.height;

const ljx = leftJaw.x * canvas.width;
const ljy = leftJaw.y * canvas.height;
const rjx = rightJaw.x * canvas.width;
const rjy = rightJaw.y * canvas.height;

// 🔥 blend jaw + eye for EAR POSITION (THIS IS KEY FIX)
const leftEarX = ljx * 0.6 + lx * 0.4;
const rightEarX = rjx * 0.6 + rx * 0.4;

// vertical position: slightly below eye, slightly above jaw
const earY = ly * 0.55 + ljy * 0.45;

// size based on eye distance (more stable than faceWidth)
const eyeDist = Math.hypot(rx - lx, ry - ly);
const size = eyeDist * 1.2;

ctx.save();

ctx.drawImage(
  earringImg.current,
  leftEarX - size / 2,
  earY - size / 2,
  size,
  size
);

ctx.drawImage(
  earringImg.current,
  rightEarX - size / 2,
  earY - size / 2,
  size,
  size
);

ctx.restore();

  } catch (err) {
    console.log("Earring error:", err);
  }
}
    });

    // ✅ CAMERA FIX
    cameraRef.current = new Camera(video, {
      onFrame: async () => {
        if (video.readyState === 4) {
          await faceMesh.send({ image: video });
        }
      },
      width: 640,
      height: 480,
    });

    cameraRef.current.start();

    return () => {
      cameraRef.current?.stop();
    };
  }, [product]);

  return (
    <div style={{ textAlign: "center" }}>
      {loading && <p>Starting Camera...</p>}

      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />

      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "10px",
          border: "2px solid #ddd",
        }}
      />
    </div>
  );
};

export default ARCamera;