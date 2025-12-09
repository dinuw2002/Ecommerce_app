import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3 }) => {
    return (
        <nav className="flex justify-center mb-8">
            <ol className="flex items-center w-full max-w-2xl text-sm font-medium text-center text-gray-500 sm:text-base">
                
                {/* Step 1: Shipping */}
                <li className={`flex md:w-full items-center ${step1 ? 'text-yellow-600' : 'text-gray-400'}`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step1 ? (
                            <Link to="/shipping" className="flex items-center">
                                <span className="mr-2">1.</span> Shipping
                            </Link>
                        ) : (
                            <span><span className="mr-2">1.</span> Shipping</span>
                        )}
                    </span>
                    {/* Line connector for desktop */}
                    <div className={`hidden sm:block w-full h-1 mx-4 rounded ${step1 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                </li>

                {/* Step 2: Payment */}
                <li className={`flex md:w-full items-center ${step2 ? 'text-yellow-600' : 'text-gray-400'}`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step2 ? (
                            <Link to="/payment" className="flex items-center">
                                <span className="mr-2">2.</span> Payment
                            </Link>
                        ) : (
                            <span><span className="mr-2">2.</span> Payment</span>
                        )}
                    </span>
                    <div className={`hidden sm:block w-full h-1 mx-4 rounded ${step2 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                </li>

                {/* Step 3: Place Order */}
                <li className={`flex items-center ${step3 ? 'text-yellow-600' : 'text-gray-400'}`}>
                    {step3 ? (
                        <Link to="/placeorder" className="flex items-center">
                            <span className="mr-2">3.</span> Place Order
                        </Link>
                    ) : (
                        <span><span className="mr-2">3.</span> Place Order</span>
                    )}
                </li>
            </ol>
        </nav>
    );
};

export default CheckoutSteps;