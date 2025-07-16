import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Download, Home, Wifi, Globe, Zap, Smartphone } from "lucide-react";

const SuccessPage = ({ transaction }) => {
  const navigate = useNavigate();

  const {
    transaction_id = '112333458493390202002',
    order_id = "SM-1234",
    plan_name = "India Unlimited Plan",
    customer_email = "user@example.com",
    customer_phone = "+91 9876543210",
    qr_code_url = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
  } = transaction || {};

  const esimBenefits = [
    {
      icon: <Globe size={24} className="text-blue-500" />,
      title: "Instant Activation",
      description: "No waiting for physical SIM delivery"
    },
    {
      icon: <Wifi size={24} className="text-green-500" />,
      title: "Multiple Profiles",
      description: "Store multiple eSIMs on one device"
    },
    {
      icon: <Zap size={24} className="text-yellow-500" />,
      title: "Eco-Friendly",
      description: "No plastic waste from physical SIMs"
    },
    {
      icon: <Smartphone size={24} className="text-purple-500" />,
      title: "Easy Switching",
      description: "Change networks without swapping SIMs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      {/* Left Side Content - eSIM Benefits */}
      <div className="hidden lg:block w-64 mr-8 animate-[fadeInRight_0.5s_ease-out_forwards]">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wifi className="text-blue-500" />
            eSIM Benefits
          </h3>
          <ul className="space-y-4">
            {esimBenefits.map((benefit, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 animate-[fadeIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="mt-1">{benefit.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Success Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative z-10 animate-[fadeIn_0.5s_ease-out_forwards]">
        <div className="relative">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-[pingSlow_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <CheckCircle className="relative text-green-500" size={72} strokeWidth={1.5} />
        </div>

        <div className="space-y-2 mt-4">
          <h2 className="text-3xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-600 text-lg">Your eSIM has been activated</p>
        </div>

        <div className="w-full bg-gray-50 rounded-xl p-5 space-y-3 text-sm border border-gray-100 shadow-inner mt-6">
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="font-medium text-gray-500">Transaction ID</span>
            <span className="text-gray-800">{transaction_id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="font-medium text-gray-500">Order ID</span>
            <span className="text-gray-800">{order_id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="font-medium text-gray-500">Plan</span>
            <span className="text-gray-800">{plan_name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="font-medium text-gray-500">Email</span>
            <span className="text-gray-800">{customer_email}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium text-gray-500">Phone</span>
            <span className="text-gray-800">{customer_phone}</span>
          </div>
        </div>

        <div className="w-full space-y-4 mt-6">
          <p className="text-gray-600">Scan this QR Code to activate your eSIM:</p>
          <div className="p-3 bg-white rounded-xl border-2 border-dashed border-blue-100 inline-block">
            <img
              src={qr_code_url}
              alt="eSIM QR Code"
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
          <a
            href={qr_code_url}
            download="eSIM_QR_Code"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow hover:shadow-md flex-1"
          >
            <Download size={18} />
            Download QR
          </a>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex-1"
          >
            <Home size={18} />
            Go to Home
          </button>
        </div>
      </div>

      {/* Right Side Content - Usage Tips */}
      <div className="hidden lg:block w-64 ml-8 animate-[fadeInLeft_0.5s_ease-out_forwards]">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            Quick Tips
          </h3>
          <ul className="space-y-4">
            <li 
              className="flex items-start gap-3 animate-[fadeIn_0.5s_ease-out_forwards]" 
              style={{ animationDelay: '0.7s' }}
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <p className="text-sm text-gray-600">Scan QR within 24 hours for activation</p>
            </li>
            <li 
              className="flex items-start gap-3 animate-[fadeIn_0.5s_ease-out_forwards]" 
              style={{ animationDelay: '0.8s' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <p className="text-sm text-gray-600">Keep this confirmation for reference</p>
            </li>
            <li 
              className="flex items-start gap-3 animate-[fadeIn_0.5s_ease-out_forwards]" 
              style={{ animationDelay: '0.9s' }}
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <p className="text-sm text-gray-600">Contact support if activation fails</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Animation definitions */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pingSlow {
          75%, 100% { transform: scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;