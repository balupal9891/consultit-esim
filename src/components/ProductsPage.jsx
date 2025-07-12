import { useOrders } from "../appContext/OrderContext";
import { useProducts } from "../appContext/ProductContext";
import toast, { ToastBar } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Component, SquareChartGantt } from "lucide-react";
import InfiniteScroll from 'react-infinite-scroll-component';
// import DashboardLayout from "../layout/DashbaordLayout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../appContext/CartContext";
import { GiRoastChicken } from "react-icons/gi";

export default function ProductsPage() {
  const { products: productsContext, loading } = useProducts();
  const { addOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const {addToCart} = useCart();

  useEffect(() => {
    console.log("current page")
    setFilterProducts(productsContext);
  }, [productsContext])

  useEffect(() => {
    setProducts(filterProducts.slice(0, Math.min(20 , filterProducts.length)));
  }, [filterProducts])


  async function handleAddToCart(product) {
      addToCart(product);
      toast.success('Item added to cart');
      navigate(`/cart`)
  }

  async function handleSearchProduct() {
    const tempProducts = productsContext.filter((product) => (
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    console.log(tempProducts);
    setFilterProducts(tempProducts);

  }
  async function fetchMoreData() {
    setProducts(filterProducts.slice(0, Math.min((products.length + 10), filterProducts.length)));
  }

  return (

    <div
      id="scrollableDiv"
      className="max-w-7xl mx-auto px-4 py-10 flex-1 overflow-y-auto scroll-smooth bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen"
    >
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-indigo-700 drop-shadow-lg">
        <Component className="inline mr-2 text-indigo-900" />
        Products
      </h1>

      {/* Search Bar */}
      <div className="mb-10 flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
        <input
          name="search-bar"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchProduct();
            }
          }}
          className="border w-full p-3 border-indigo-300 bg-white text-gray-700 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          onClick={handleSearchProduct}
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <span className="loading loading-spinner block mx-auto w-10 h-10 text-indigo-600"></span>
      )}

      {/* Product Grid */}
      {!loading && (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={products.length < filterProducts.length}
          loader={
            <span className="loading loading-spinner block mx-auto mt-2 w-10 h-10 text-indigo-600"></span>
          }
          endMessage={
            <p className="text-center mt-6 text-indigo-700 font-medium">
              <b>🎉 Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 &&
              products.map((product, inx) => (
                <div
                  key={inx}
                  className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.02] transition border border-indigo-100"
                  // onClick={()=>{
                  //   navigate(`/dashboard/products/${product?.id}`)
                  // }}
                >
                  <h2 className="text-xl font-bold text-purple-700 mb-2">{product?.name}</h2>
                  <p className="text-gray-800">
                    <span className="font-semibold">💰 Price:</span> {product?.price}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">📶 Data:</span> {product?.data}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">📅 Validity:</span> {product?.validity}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-semibold">🌍 Region:</span> {product?.region}
                  </p>
                  <p className="text-gray-800 mb-4">
                    <span className="font-semibold">📦 Type:</span> {product?.planType}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer shadow-md transition"
                    >
                      Add to cart
                    </button>

                    <button
                      onClick={() => document.getElementById(product?.id).showModal()}
                      className="bg-gray-100 hover:bg-indigo-100 text-indigo-700 cursor-pointer font-medium px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      Show Details
                    </button>
                  </div>

                  {/* Product Modal */}
                  <dialog
                    id={product?.id}
                    className="modal"
                    onClick={(e) => {
                      const dialog = document.getElementById(product?.id);
                      if (e.target === dialog) dialog.close();
                    }}
                  >
                    <div className="modal-box bg-white rounded-2xl shadow-2xl p-6 max-w-md">
                      <h1 className="text-2xl font-bold text-indigo-800 mb-2">
                        {product.name}
                      </h1>
                      <p className="text-indigo-600 text-lg font-medium mb-4">
                        💰 Price: {product.price}
                      </p>
                      <ul className="space-y-1 text-gray-700 text-sm mb-4">
                        <li>
                          <strong>📶 Data:</strong> {product.data}
                        </li>
                        <li>
                          <strong>🌍 Region:</strong> {product.region}
                        </li>
                        <li>
                          <strong>📅 Validity:</strong> {product.validity}
                        </li>
                        <li>
                          <strong>📦 Plan Type:</strong> {product.planType}
                        </li>
                      </ul>

                      <div>
                        <h2 className="font-semibold text-gray-800 mb-1">
                          🗺️ Available Countries:
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {product?.countries.map((country) => (
                            <span
                              key={country.id}
                              className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                            >
                              {country.country_name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="modal-action mt-6">
                        <form method="dialog">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer px-4 py-2 rounded-lg transition">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              ))}
          </div>
        </InfiniteScroll>
      )}
    </div>


  );
}
