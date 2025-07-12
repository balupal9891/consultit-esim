import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../appContext/ProductContext";
import { useCart } from "../appContext/CartContext";
import { useOrders } from "../appContext/OrderContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../appContext/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function PlanPage() {
  const { currency, user } = useUser();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { fetchOrders, setOrderCreated } = useOrders();
  const { country } = useParams();

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const ACCESS_KEY = "DjnsCwxlFPH0uX3IZNf7oz_ekD4sZzPJemOAGDS4zww";
  const [quantity, setQuantity] = useState(1);
  const [groupedPlans, setGroupedPlans] = useState({});
  const [dataOptions, setDataOptions] = useState(["1 GB / 30 Days"]);
  const [selectedData, setSelectedData] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    getImageByKeyword(country.toLowerCase());
  }, [country]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(country?.toLowerCase())
    );

    const grouped = filtered.reduce((acc, plan) => {
      if (!acc[plan.data] && plan.data !== "Unlimited") {
        acc[plan.data] = plan;
      }
      return acc;
    }, {});

    const options = Object.keys(grouped).sort((a, b) => {
      if (a === "Unlimited") return 1;
      if (b === "Unlimited") return -1;
      return parseFloat(a) - parseFloat(b);
    });

    setGroupedPlans(grouped);
    setDataOptions(options);
    if (options.length > 0) {
      setSelectedData(options[0]);
      setSelectedPlan(grouped[options[0]]);
    }
  }, [products, country]);

  // Update selectedPlan when selectedData changes
  useEffect(() => {
    if (groupedPlans && selectedData) {
      setSelectedPlan(groupedPlans[selectedData]);
    }
  }, [selectedData, groupedPlans]);

  async function getImageByKeyword(keyword) {
    try {
      setImageLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&per_page=1&client_id=${ACCESS_KEY}`
      );
      const data = await res.json();
      const imageUrl = data.results?.[0]?.urls?.regular;
      setImage(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setImageLoading(false);
    }
  }

  async function handleBuyProduct() {
    if (!user) {
      toast("Login to buy");
      navigate("/login");
      return;
    }

    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    setLoadingBuy(true);
    try {
      let token = localStorage.getItem("esim-accessToken");
      console.log("planId", selectedPlan?.localPlanId);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/order/place-new-order`,
        {
          planId: selectedPlan?.localPlanId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        setOrderCreated(res?.data?.data);
        fetchOrders();
        navigate(`/payment/${res?.data?.data?.orderSeqId}`);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoadingBuy(false);
    }
  }

  async function handleAddToCart() {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    setLoadingAddToCart(true);
    try {
      addToCart({ ...selectedPlan, quantity });
      toast.success("Added to cart successfully!");
      navigate("/cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoadingAddToCart(false);
    }
  }

  const formatCountryName = (name) => {
    return name
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  console.log("select plan price", selectedPlan?.price);
  const numericPrice = parseFloat(selectedPlan?.price.replace(/[^0-9.]/g, ""));

  const totalPrice = numericPrice * quantity;
  console.log("total price", totalPrice);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <span
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="mx-2">›</span>
          <span className="font-medium text-gray-900">
            {formatCountryName(country)} eSIM
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Image */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
              {imageLoading ? (
                <div className="w-full h-[500px] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500">Loading image...</div>
                </div>
              ) : (
                <img
                  src={image || "/default-country-image.jpg"}
                  alt={`${country} esim`}
                  className="w-full h-[500px] object-cover"
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Title on image */}
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
                  {formatCountryName(country)} eSIM
                </h1>
                <p className="text-lg text-gray-200 drop-shadow">
                  Stay connected anywhere in {formatCountryName(country)}
                </p>
              </div>

              {/* Price badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-2xl font-bold text-gray-900">
                  {currency} {totalPrice || 0}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Why Choose Our eSIM?
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Instant Activation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No SIM Swap</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>QR Code Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Plan Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  Choose Your Plan
                </h2>
                {/* <p className="text-gray-600">
                                    Select the perfect data plan for your trip
                                </p> */}
              </div>

              {/* Data Selector */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                  <span className="mr-2">📶</span>
                  Select Data Plans
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dataOptions.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedData(option)}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 text-left ${
                        selectedData === option
                          ? "bg-blue-50 border-blue-500 shadow-lg transform scale-105"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="font-semibold text-gray-900">
                        {option} GB
                      </div>
                      <div className="text-sm text-gray-600">
                        {groupedPlans[option]?.validity} Days
                      </div>
                      {/* <div className="text-sm font-medium text-blue-600 mt-1">
                                                {currency} {groupedPlans[option]?.price * 90}
                                            </div> */}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 border-2 border-gray-200 rounded-xl hover:bg-gray-200 flex items-center justify-center text-xl font-bold transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-gray-100 border-2 border-gray-200 rounded-xl hover:bg-gray-200 flex items-center justify-center text-xl font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Plan Summary */}
              {selectedPlan && (
                <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Order Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPlan.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Validity:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPlan.validity} Days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPlan.data} GB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium text-gray-900">
                        {quantity}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">
                          {currency} {totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  disabled={loadingBuy || !selectedPlan}
                  onClick={handleBuyProduct}
                  className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  {loadingBuy ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "🚀 Buy Now"
                  )}
                </button>

                <button
                  disabled={loadingAddToCart || !selectedPlan}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-gray-800 text-white text-lg font-semibold rounded-xl hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  {loadingAddToCart ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    "🛒 Add to Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
