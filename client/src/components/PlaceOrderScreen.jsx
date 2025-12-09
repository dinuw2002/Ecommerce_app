import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const { cartItems, totalPrice, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod')) || 'Not Selected';

    useEffect(() => {
        if (!user) navigate('/login');
        else if (cartItems.length === 0) navigate('/cart');
        else if (paymentMethod === 'Not Selected') navigate('/payment');
    }, [user, cartItems, paymentMethod, navigate]);
    
    const shippingPrice = totalPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    const taxPrice = totalPrice * taxRate;
    const finalOrderTotal = totalPrice + shippingPrice + taxPrice;

    const formatPrice = (price) => price.toFixed(2);

    const placeOrderHandler = () => {
        alert(`Order Placed Successfully!\nTotal: $${formatPrice(finalOrderTotal)}`);
        clearCart(); 
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        navigate('/'); 
    };

    if (cartItems.length === 0) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 step2 step3 />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                
                {/* LEFT COLUMN: Order Details */}
                <div className="md:col-span-2 space-y-8">
                    
                    {/* Shipping Info */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Shipping</h2>
                        <p className="text-gray-600">
                            <strong>Address: </strong> 
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment Method</h2>
                        <p className="text-gray-600">
                            <strong>Method: </strong> {paymentMethod}
                        </p>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Items</h2>
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                        <Link to={`/product/${item._id}`} className="text-blue-600 hover:underline">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="text-gray-600">
                                        {item.qty} x ${formatPrice(item.price)} = 
                                        <span className="font-bold text-gray-800 ml-1">${formatPrice(item.qty * item.price)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                        
                        <div className="flex justify-between items-center mb-2 text-gray-600">
                            <span>Items:</span><span>${formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2 text-gray-600">
                            <span>Shipping:</span><span>${formatPrice(shippingPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 text-gray-600 border-b pb-4">
                            <span>Tax (15%):</span><span>${formatPrice(taxPrice)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-6 text-xl font-bold text-gray-900">
                            <span>Total:</span><span>${formatPrice(finalOrderTotal)}</span>
                        </div>
                        
                        <button
                            onClick={placeOrderHandler}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;