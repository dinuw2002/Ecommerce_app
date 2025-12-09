import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));

    useEffect(() => {
        if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 step2 />
            
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Payment Method</h1>
                
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-4">Select Method</label>
                        
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                <input 
                                    type="radio" name="paymentMethod" value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 text-yellow-500 focus:ring-yellow-500"
                                />
                                <span className="text-gray-800">PayPal or Credit Card</span>
                            </label>

                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                <input 
                                    type="radio" name="paymentMethod" value="CashOnDelivery"
                                    checked={paymentMethod === 'CashOnDelivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-5 h-5 text-yellow-500 focus:ring-yellow-500"
                                />
                                <span className="text-gray-800">Cash On Delivery</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition duration-200">
                        Continue to Summary
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentScreen;