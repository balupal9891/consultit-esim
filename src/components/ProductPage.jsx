import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../appContext/ProductContext';
import { useEffect, useState } from 'react';


export default function ProductPage({ }) {
    const { id } = useParams();
    const { products } = useProducts();
    const product = products.find((p) => p.id == id);
  useEffect(() => {
    console.log("current page")
   
  }, [])
    async function handleOrder() {

    }

    if (!product) {
        return <div className="text-center text-2xl mt-20 text-red-500">Product not found.</div>;
    }


    return (
        <>
                {/* <div className="min-h-[calc(100vh-16)] bg-white py-10 px-4 w-full flex flex-1 justify-center items-center">
                    <div className="max-w-3xl mx-auto bg-slate-100 shadow-xl rounded-2xl p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

                        <div className="mb-4">
                            <p className="text-2xl text-indigo-600 font-semibold">
                                ₹{product.price}
                            </p>
                            <p className="text-sm text-gray-500">One-time payment</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-md text-gray-700 mb-6">
                            <div>
                                <span className="font-medium">Data:</span> {product.data}
                            </div>
                            <div>
                                <span className="font-medium">Region:</span> {product.region}
                            </div>
                            <div>
                                <span className="font-medium">Validity:</span> {product.validity}
                            </div>
                            <div>
                                <span className="font-medium">Plan Type:</span> {product.planType}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-md font-medium text-gray-800 mb-2">Countries Available:</p>
                            <div className="flex flex-wrap gap-2">
                                {product.countries.map((country, i) => (
                                    <span
                                        key={i}
                                        className="bg-indigo-700 text-white font-semibold text-xs px-3 py-1 rounded-full"
                                    >
                                        {country.country_name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleOrder}
                            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition text-lg font-semibold"
                        >
                            Buy Now – ${product.price}
                        </button>
                    </div>
                </div> */}

                <div className="max-h-[calc(100vh-16)] w-full bg-gradient-to-br from-white via-indigo-50 to-purple-100 px-4 py-10 flex justify-center items-center">
                    <div className="max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
                        {/* Product Name */}
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-4 text-center">
                            {product.name}
                        </h1>

                        {/* Price Section */}
                        <div className="mb-6 text-center">
                            <p className="text-2xl sm:text-3xl text-purple-600 font-semibold mb-1">
                                {product.price}
                            </p>
                            <p className="text-sm text-gray-500">One-time payment</p>
                        </div>

                        {/* Product Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base mb-6">
                            <div>
                                <span className="font-medium text-indigo-700">📶 Data:</span> {product.data}
                            </div>
                            <div>
                                <span className="font-medium text-indigo-700">🌍 Region:</span> {product.region}
                            </div>
                            <div>
                                <span className="font-medium text-indigo-700">📅 Validity:</span> {product.validity}
                            </div>
                            <div>
                                <span className="font-medium text-indigo-700">📦 Plan Type:</span> {product.planType}
                            </div>
                        </div>

                        {/* Country Tags */}
                        <div className="mb-6">
                            <p className="text-md font-semibold text-gray-800 mb-2">🗺️ Countries Available:</p>
                            <div className="flex flex-wrap gap-2">
                                {product.countries.map((country, i) => (
                                    <span
                                        key={i}
                                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                                    >
                                        {country.country_name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Buy Now Button */}
                        <button
                            onClick={handleOrder}
                            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:scale-[1.02] hover:shadow-lg transition text-lg font-semibold"
                        >
                            Buy Now – {product.price}
                        </button>
                    </div>
                </div>


        </>


    );
}
