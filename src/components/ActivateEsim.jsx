import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ActivateEsim() {
  const [iccid, setIccid] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleActivate = async () => {
    if (!iccid.trim()) {
      toast.error("Please enter a valid ICC-ID");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://your-api.com/esim/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iccid }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("eSIM activated successfully!");
        navigate("/orders");
      } else {
        toast.error(data.message || "Activation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4">
      <div className="w-full h-70 mt-4 bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Activate eSIM</h2>

        <label className="block mb-2 text-gray-700">ICC-ID</label>
        <input
          type="text"
          placeholder="Enter iccid number"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={iccid}
          onChange={(e) => setIccid(e.target.value)}
        />

        <div className="flex gap-4 max-w-md">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            onClick={handleActivate}
            disabled={loading}
          >
            {loading ? "Activating..." : "Activate"}
          </button>
          <button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-200"
            onClick={() => setIccid("")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
