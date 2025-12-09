import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
    const { cartItems, totalPrice, totalItems, removeFromCart, addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-sm" role="alert">
                    <p className="font-bold">Your cart is empty.</p>
                    <Link to="/" className="text-blue-600 underline hover:text-blue-800">Go Back Shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Cart Items List */}
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                
                                {/* Product Image & Name */}
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                    <Link to={`/product/${item._id}`} className="text-lg font-medium text-gray-800 hover:text-blue-600 transition">
                                        {item.name}
                                    </Link>
                                </div>

                                {/* Price */}
                                <div className="text-gray-600 font-semibold my-2 sm:my-0">
                                    ${item.price.toFixed(2)}
                                </div>

                                {/* Controls: Qty & Delete */}
                                <div className="flex items-center gap-4">
                                    <select 
                                        value={item.qty} 
                                        onChange={(e) => addToCart(item, Number(e.target.value))}
                                        className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>

                                    <button 
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                                        title="Remove Item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Order Summary Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                            
                            <div className="flex justify-between items-center mb-4 text-gray-600">
                                <span>Total Items:</span>
                                <span className="font-semibold">{totalItems}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-6 text-xl font-bold text-gray-900">
                                <span>Total Price:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                                className={`w-full py-3 rounded-lg text-white font-bold uppercase tracking-wide transition duration-300 ${
                                    cartItems.length === 0 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-yellow-500 hover:bg-yellow-600 shadow-md hover:shadow-lg'
                                }`}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;