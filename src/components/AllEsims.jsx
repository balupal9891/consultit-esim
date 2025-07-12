import React from 'react';

const AllEsims = ({ esimOrders }) => {
  if (!esimOrders || esimOrders.length === 0) {
    return (
      <p className="p-4 text-gray-600 text-center">
        No eSIMs found.
      </p>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen text-black">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
        Select Your eSIM
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {esimOrders.map((order, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <p className="text-gray-800">
              <span className="font-semibold">Order ID:</span> {order.order_id}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">eSIM No:</span> {order.esim.iccid}
            </p>
            <p className="text-blue-700 font-semibold">
              Country: <span className="font-normal">{order.plan.country}</span>
            </p>
            <p className="text-blue-700 font-semibold">
              Operator: <span className="font-normal">{order.plan.operator}</span>
            </p>
            <p className="text-green-700 font-semibold">
              Data: <span className="font-normal">{order.plan.data}</span>
            </p>
            <p className="text-gray-700">
              Validity: {order.plan.validity_days} days
            </p>
            <p className="text-blue-700 font-medium">
              Price: ${order.plan.price_usd}
            </p>

            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Activate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEsims;
