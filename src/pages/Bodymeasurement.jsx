import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BodyMeasurementForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    height: "",
    weight: "",
    bust: "",
    waist: "",
    hips: ""
  });

  const avatarMap = {
  pear: "https://images.unsplash.com/photo-1646932520067-81bdc09af07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  hourglass: "https://images.unsplash.com/photo-1714252562812-4be7f7daf283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  inverted_triangle: "https://images.unsplash.com/photo-1704659943195-2d5f8cdcc538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  rectangle: "https://images.unsplash.com/photo-1758599879024-7379d769f664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",

  apple: "https://images.unsplash.com/photo-1603993641717-a22c732d8df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

  const [bodyType, setBodyType] = useState("");
  const [showResult, setShowResult] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // BODY TYPE LOGIC (FRONTEND VERSION)
  const calculateBodyType = () => {
    const bust = Number(form.bust);
    const waist = Number(form.waist);
    const hips = Number(form.hips);

    if (hips >= bust + 8 && hips - waist >= 20) {
      return "pear";
    }

    if (bust >= hips + 8) {
      return "inverted_triangle";
    }

    if (Math.abs(bust - hips) <= 5 && waist < bust - 10) {
      return "hourglass";
    }

    return "rectangle";
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const type = calculateBodyType();

    setBodyType(type);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Body Measurement Form
        </h2>
          {/* <p>Don't add the units when filling the form. </p>*/}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="height"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />

          <input
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />

          <input
            name="bust"
            placeholder="Bust (cm)"
            value={form.bust}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />

          <input
            name="waist"
            placeholder="Waist (cm)"
            value={form.waist}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />

          <input
            name="hips"
            placeholder="Hips (cm)"
            value={form.hips}
            onChange={handleChange}
            className="border rounded px-4 py-2"
            required
          />

          <button className="bg-purple-700 text-white py-2 rounded">
            Get My Body Type
          </button>
        </form>

        {/* RESULT SECTION */}
        {showResult && (
          <div className="mt-6 text-center">

            <h3 className="text-lg font-bold">
              Based on your measurements:
            </h3>

            <p className="text-purple-700 text-2xl capitalize mt-2">
              {bodyType} shape
            </p>


            {/* AVATAR PREVIEW */}
            <div className="mt-4 flex justify-center">
              <img
                src={avatarMap[bodyType]}
                alt={bodyType}
                className="w-40 h-40 object-contain"
              />
            </div>

            {/* BUTTON TO NEXT STEP */}
            <button
              onClick={() => navigate("/recommendations", { state: { bodyType } })}
              className="mt-4 bg-purple-700 text-white px-4 py-2 rounded"
            >
              See Recommendations
            </button>
          </div>
        )}

        {/* FALLBACK */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-2">
            Not sure about your measurements?
          </p>

          <button
            onClick={() => navigate("/avatarselection")}
            className="text-purple-700 underline"
          >
            Choose visually instead
          </button>
        </div>

      </div>
    </div>
  );
}