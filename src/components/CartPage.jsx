import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { useCart } from "../appContext/CartContext";
import { useState, useEffect } from "react";

export default function CartPage() {
    const { cart, setCart, removeFromCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        calcTotalPrice();
    }, [cart]);

    function calcTotalPrice() {
        const total = cart.reduce((acc, item) => Number(acc) + Number(item.price) * Number(item.quantity), 0);
        setTotalPrice(total);
    }

    function updateQuantity(productId, newQuantity) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            )
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 text-black py-10 px-4 md:px-6">
            <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center bg-white py-3 rounded-lg shadow">
                <PiShoppingCartSimpleLight className="w-8 h-8 mr-2 text-blue-600" />
                Your Cart
            </h2>

            {cart?.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col md:flex-row gap-6">
                    {/* LEFT: Cart Items */}
                    <div className="lg:w-2/3 space-y-6">
                        {cart?.map((product, inx) => (
                            <div
                                key={inx}
                                className="flex flex-col sm:flex-row items-start gap-4 border border-gray-200 rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition"
                            >
                                {/* Product Image Placeholder */}
                                <div className="w-full sm:w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg">
                                    <span className="text-gray-400 text-sm">Image</span>
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 w-full">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{product.name}</h2>

                                    <div className="text-sm text-gray-700 mt-1">
                                        <div>
                                            <span className="font-medium">Region:</span> {product.region}
                                        </div>
                                        <div>
                                            <span className="font-medium">Plan Type:</span> {product.planType}
                                        </div>
                                        <div>
                                            <span className="font-medium">Data:</span> {product.data} GB
                                        </div>
                                        <div>
                                            <span className="font-medium">Validity:</span> {product.validity} days
                                        </div>
                                        <div className="mt-1 text-lg font-bold text-green-600">
                                            Price: ${product.price}
                                        </div>
                                    </div>

                                    {/* Covered Countries */}
                                    <div className="mt-2">
                                        <div className="text-sm font-medium text-gray-700">Covered Countries:</div>
                                        <ul className="flex flex-wrap text-xs text-gray-600 mt-1">
                                            {product.countries.map((country) => (
                                                <li
                                                    key={country.id}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 m-1 rounded-full"
                                                >
                                                    {country.country_name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Quantity Manage  */}
                                    <div className="flex items-center gap-4 mt-3">
                                        <button
                                            onClick={() => updateQuantity(product.id , product.quantity-1)}
                                            className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-100 border rounded-full hover:bg-gray-200"
                                        >
                                            −
                                        </button>
                                        <span className="text-lg font-semibold w-6 text-center">{product.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(product.id , product.quantity+1)}
                                            className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-100 border rounded-full hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold py-2 px-4 rounded"
                                        >
                                            Buy Now
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="flex-1 border border-red-400 text-red-500 hover:bg-red-50 text-sm font-semibold py-2 px-4 rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* RIGHT: Price Summary */}
                    <div className="md:w-1/3 sticky top-20 h-fit bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-purple-600">
                            Price Details
                        </h2>

                        <div className="space-y-3 text-gray-800">
                            <div className="flex justify-between border-b pb-2">
                                <span>Price ({cart.length} items)</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-green-600">-$0.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                                <span>Total Amount</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
