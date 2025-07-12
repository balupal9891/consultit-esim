import { Link } from "react-router-dom";
import { useOrders } from "../appContext/OrderContext";
import { useEffect, useState } from "react";




const statusStyles = {
  completed: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  uncompleted: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { orders } = useOrders();
  const [viewOrders, setViewOrders] = useState([]);
  const [selectedButton, setSelectedButton] = useState('all')

  useState(() => {
    setViewOrders(orders);
  }, [orders])

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full text-black">
      <h1 className="text-2xl font-bold mb-6 text-black">Orders</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Total Orders" value={orders?.length} />
        <SummaryCard title="Completed Orders" value={orders.filter(order => order.orderStatus === "COMPLETED").length} />
        <SummaryCard title="Pending Orders" value={orders.filter(order => order.orderStatus === "PENDING").length} />
        <SummaryCard title="Canceled Orders" value={orders.filter(order => order.orderStatus === "CANCELLED").length} />
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-3 text-sm font-medium">
          <button
            className={`border-b-2 ${selectedButton === 'all'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 border-transparent'
              }`}
            onClick={() => {
              setViewOrders(orders);
              setSelectedButton('all');
            }}
          >
            All
          </button>
          <button
            className={`border-b-2 ${selectedButton === 'completed'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 border-transparent'
              }`}
            onClick={() => {
              setViewOrders(orders.filter((o) => o.orderStatus === 'COMPLETED'));
              setSelectedButton('completed');
            }}
          >
            Completed
          </button>
          <button
            className={`border-b-2 ${selectedButton === 'pending'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 border-transparent'
              }`}
            onClick={() => {
              setViewOrders(orders.filter((o) => o.orderStatus === 'PENDING'));
              setSelectedButton('pending');
            }}
          >
            Pending
          </button>
          <button
            className={`border-b-2 ${selectedButton === 'cancelled'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 hover:text-blue-600 border-transparent'
              }`}
            onClick={() => {
              setViewOrders(orders.filter((o) => o.orderStatus === 'CANCELLED'));
              setSelectedButton('cancelled');
            }}
          >
            Cancelled
          </button>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Total</th>
              {/* <th className="px-4 py-2">Delivery</th> */}
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {viewOrders.map((order, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2 font-medium text-blue-600"><Link to={`/dashboard/orders/${order?.orderSeqId}`} className="hover:underline hover:underline-offset-2 decoration-1" >{order?.orderSeqId}</Link></td>
                <td className="px-4 py-2">09-07-2025</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[order?.orderStatus]}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-2">{order?.amount}</td>
                {/* <td className="px-4 py-2">{order.delivery_status}</td> */}
                <td className="px-4 py-2">{order?.planName}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[order?.orderStatus]}`}>
                    {order?.orderStatus?.toLowerCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 text-black">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="text-xl font-bold">{value}</div>
      {/* <div className="text-xs text-green-500">{change} last week</div> */}
    </div>
  );
}






// const orders = [
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
//   {
//     order_id: "ORD123456",
//     date: "2025-07-03",
//     customer: "Rahul Mehta",
//     payment_status: "paid",
//     total: "$9.99",
//     delivery_status: "delivered",
//     items: "1 plan",
//     fulfillment: "completed",
//   },
// ];