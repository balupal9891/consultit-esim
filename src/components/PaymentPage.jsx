import React, { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { useParams } from "react-router-dom";
import { useProducts } from "../appContext/ProductContext";
import { useOrders } from "../appContext/OrderContext";
import axios from "axios";
import { useUser } from "../appContext/UserContext";
import toast from "react-hot-toast";

export default function Cashfree() {
  const [isLoading, setIsLoading] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { orderCreated } = useOrders();
  const { user } = useUser();

  //     async function managePayment() {
  //         if (!orderCreated) {
  //             toast.error('Error while Ordering');
  //         }
  //         if(!user){
  //             toast.error('User not available');
  //         }
  //         setIsLoading(true)
  //         await axios.post(`${import.meta.env.VITE_SERVER_URL}/payment/create-order`, {
  //                 amount: orderCreated?.amount * 90,
  //                 orderSeqId: orderCreated?.orderSeqId,
  //                 userId: user?.userId
  //         })
  //         .then(res => res?.data?.data)
  //         .then(data => {
  //             if(data?.payments?.url){
  //                 window.location = data?.payments?.url;
  //             }
  //         })
  //         setIsLoading(false)
  // }
console.log("Order Created:", orderCreated);
  const initializeCashfree = async () => {
    try {
      const cashfreeInstance = await load({ mode: "sandbox" });
      setCashfree(cashfreeInstance);
      return cashfreeInstance;
    } catch (error) {
      console.error("Failed to load Cashfree SDK:", error);
      alert("Failed to initialize payment system");
      return null;
    }
  };

  const numericPrice = parseFloat(orderCreated?.amount.replace(/[^0-9.]/g, ""));
  
  
  const createOrder = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: numericPrice,
            orderSeqId: orderCreated?.orderSeqId,
            userId: user?.userId,
          }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response?.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  };

  const startPayment = async () => {
    setIsLoading(true);

    try {
      let cashfreeInstance = cashfree;
      if (!cashfreeInstance) {
        cashfreeInstance = await initializeCashfree();
        if (!cashfreeInstance) {
          setIsLoading(false);
          return;
        }
      }

      const orderData = await createOrder();

      if (!orderData.payment_session_id) {
        alert("Failed to create payment session");
        setIsLoading(false);
        return;
      }

      const checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal",
        appearance: {
          variables: {
            colorPrimary: "#3b82f6",
            colorBackground: "#ffffff",
            colorText: "#1f2937",
            fontFamily: "system-ui, sans-serif",
          },
        },
      };

      const result = await cashfreeInstance.checkout(checkoutOptions);

      if (result?.error) {
        console.error("Payment failed:", result.error);
        alert(`Payment failed: ${result.error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Payment process failed:", error);
      alert("Payment process failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Checkout
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Complete your payment securely
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="mb-2">
            <span className="block text-sm text-gray-600">Product</span>
            <span className="text-lg font-semibold text-gray-800">
              {orderCreated?.planName}
            </span>
          </div>
          <div className="mb-2">
            <span className="block text-sm text-gray-600">Amount:</span>
            <span className="text-lg font-semibold text-green-600">
              ₹{numericPrice}
            </span>
          </div>
          <div>
            <span className="block text-sm text-gray-600">Currency:</span>
            <span className="text-md text-gray-700">INR</span>
          </div>
        </div>

        <button
          onClick={startPayment}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Pay with Cashfree"
          )}
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          🔒 Secure payment powered by Cashfree
        </p>
      </div>
    </div>
  );
}
