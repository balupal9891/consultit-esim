import { useEffect, useState } from "react";
import { useUser } from "../appContext/UserContext";
import { useParams } from "react-router-dom";
import { useOrders } from "../appContext/OrderContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function OrderViewPage() {
  const { currency } = useUser();
  const { id } = useParams()
  const { orders, removeOrder } = useOrders();
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const tempOrder = orders.find(order => order?.orderSeqId == id)
    setOrder(tempOrder)
    console.log(tempOrder);
  }, [orders]);

  async function handleCancelOrder(){
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/order/cancel`, {orderSeqId:order?.orderSeqId}, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('esim-accessToken')}`,
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      // console.log(response);
      // console.log(response.status);
      if(response?.status == 200){
        toast.success('Order Cancelled Successfully');
        removeOrder(order?.orderSeqId);
        navigate('/dashboard/orders');
      }
      console.log(response);
    })
  }

  if(!order){
    return (
      <div className="text-xl text-gray-600 text-center">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-6">
      <div className="w-full h-80 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Order Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 border-t border-b border-gray-400 py-4">
          <div><strong>Order ID:</strong> {order?.orderSeqId}</div>
          <div><strong>Status:</strong> <span className="text-yellow-600">{order?.orderStatus}</span></div>
          <div><strong>Amount:</strong> <span className="text-green-600">{currency} {order?.amount * 90}</span></div>
          <div><strong>Plan:</strong> {order?.planName}</div>
          <div><strong>Data:</strong> {order?.planData} GB</div>
          <div><strong>Validity:</strong> {order?.planValidity} Days</div>
          <div><strong>ICC ID:</strong> {order?.iccId !== "null" ? order.iccId : "Not Assigned"}</div>
          <div><strong>Active:</strong> {order.isActive ? "Yes" : "No"}</div>
        </div>

        <div className="mt-4 flex gap-x-2">
          <button className="btn bg-blue-600" >Complete order</button>
          <button className="btn bg-red-600" onClick={handleCancelOrder}>Cancel order</button>
        </div>
      </div>
    </div>
  );
};

