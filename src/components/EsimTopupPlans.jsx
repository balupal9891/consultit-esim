import React, { useState } from "react";
import toast from "react-hot-toast";

const dummyPlans = [
  { id: 1, name: "1GB / 7 Days", amount: 3.99 },
  { id: 2, name: "1GB / 7 Days", amount: 6.9 },
  { id: 3, name: "5GB / 30 Days", amount: 12.99 }
];

export default function EsimTopup() {
  const [iccid, setIccid] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedPlan = dummyPlans.find((p) => p.id === parseInt(selectedPlanId));
  const rechargeAmount = selectedPlan ? `$${selectedPlan.amount}` : "$0";

  const handleSubmit = async () => {
    if (!iccid || !selectedPlanId) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://your-api.com/esim/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iccid, planId: selectedPlanId })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Topup Successful");
        setIccid("");
        setSelectedPlanId("");
      } else {
        toast.error(data.message || "Topup Failed");
      }
    } catch (err) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full h-95 bg-white border border-gray-200 rounded-xl p-8 shadow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">eSim Topup</h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">ICCID</label>
          <input
            type="text"
            placeholder="Enter ICCID"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={iccid}
            onChange={(e) => setIccid(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Select eSim Plan</label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
          >
            <option value="">-- Select Plan --</option>
            {dummyPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - ${plan.amount}
              </option>
            ))}
          </select>
        </div>

        <div className="text-gray-700 font-medium mb-6">
          Recharge Amount: <span className="text-blue-600">{rechargeAmount}</span>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Top up"}
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => {
              setIccid("");
              setSelectedPlanId("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
