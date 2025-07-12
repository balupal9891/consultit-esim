import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useProducts } from "../appContext/ProductContext";
import { useCart } from "../appContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function CountryPlanSelectorCard({ country }) {

  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // const [plans, setPlans] = useState([]);
  const [groupedPlans, setGroupedPlans] = useState({});
  const [dataOptions, setDataOptions] = useState([]);
  const [selectedData, setSelectedData] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [image, setImage] = useState('https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d')

  const ACCESS_KEY = 'DjnsCwxlFPH0uX3IZNf7oz_ekD4sZzPJemOAGDS4zww';

  // Filter and group plans when products or country changes
  useEffect(() => {

    getImageByKeyword(country?.name)
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(country?.name?.toLowerCase())
    );

    const grouped = filtered.reduce((acc, plan) => {
      if (!acc[plan.data] || parseFloat(plan.price) < parseFloat(acc[plan.data].price)) {
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
    setSelectedData(options[0]);
    setSelectedPlan(grouped[options[0]]);
  }, [products, country]);

  // Update selectedPlan when selectedData changes
  useEffect(() => {
    if (groupedPlans && selectedData) {
      setSelectedPlan(groupedPlans[selectedData]);
    }
  }, [selectedData, groupedPlans]);

  async function handleAddToCart() {
    addToCart(selectedPlan);
    toast.success('Item added to cart');
    navigate(`/cart`)
  }

  async function getImageByKeyword(keyword) {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${keyword}&per_page=1&client_id=${ACCESS_KEY}`
    );
    const data = await res.json();
    const imageUrl = data.results?.[0]?.urls?.regular;
    console.log("Image URL:", imageUrl);
    setImage(imageUrl);
  }

  // getImageByKeyword('india');


  return (
    <div style={{
    backgroundImage: `url("${image}")`
  }}  className={` min-h-screen w-full  p-6 sm:p-10`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <img
            src={`https://flagcdn.com/w320/${country?.iso2?.toLocaleLowerCase()}.png`}
            alt="India Flag"
            className="w-12 h-8 rounded shadow-md"
          />
          <h1 className="text-3xl font-bold text-orange-700">{country?.name} eSIM Plans</h1>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-md w-full mx-auto px-4 py-6 h-[90vh]">
          <div className="bg-gradient-to-tr from-indigo-100 via-purple-50 to-white shadow-xl rounded-2xl p-6 border border-indigo-200 flex flex-col items-center">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-indigo-700">
                🌍 {country?.name} eSIM Plan
              </h2>
              <p className="text-sm text-gray-500 mt-1">Select your preferred data amount</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {dataOptions.map((data) => (
                <button
                  key={data}
                  onClick={() => { setSelectedData(data) }}
                  className={`px-4 py-2 text-sm rounded-full font-semibold transition border ${selectedData === data
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                    }`}
                >
                  {data === "Unlimited" ? "Unlimited" : `${data} GB`}
                </button>
              ))}
            </div>

            {selectedPlan ? (
              <div className="text-center text-gray-700 space-y-1 text-sm">
                <p><strong>📅 Validity:</strong> {selectedPlan.validity} day{selectedPlan.validity > 1 ? "s" : ""}</p>
                <p><strong>💰 Price:</strong> ${selectedPlan.price}</p>
                <p><strong>📦 Type:</strong> {selectedPlan.planType}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-4">No plans available</p>
            )}

            <div className="mt-6 w-full">
              <button
                onClick={handleAddToCart}
                disabled={!selectedPlan}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl font-bold shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                Add {selectedData} {selectedData === "Unlimited" ? "Data" : "GB"} Plan to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>









  );
}
