import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { UserContext } from '../context/UserContext';

const ShippingScreen = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const initialShippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
    
    const [address, setAddress] = useState(initialShippingAddress.address || '');
    const [city, setCity] = useState(initialShippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(initialShippingAddress.postalCode || '');
    const [country, setCountry] = useState(initialShippingAddress.country || '');

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=/shipping');
        }
    }, [user, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const shippingAddress = { address, city, postalCode, country };
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
        navigate('/payment');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 />
            
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Shipping Address</h1>
                
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Address</label>
                        <input type="text" placeholder="Enter address" value={address}
                            onChange={(e) => setAddress(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">City</label>
                        <input type="text" placeholder="Enter city" value={city}
                            onChange={(e) => setCity(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Postal Code</label>
                        <input type="text" placeholder="Enter postal code" value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Country</label>
                        <input type="text" placeholder="Enter country" value={country}
                            onChange={(e) => setCountry(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition duration-200">
                        Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingScreen;