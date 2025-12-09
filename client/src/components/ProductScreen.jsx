import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation for search

const ProductScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the search query from the URL (e.g., ?keyword=iphone)
    const location = useLocation();
    const keyword = location.search; 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Fetch products using the keyword (if empty, it fetches all)
                const { data } = await axios.get(`http://localhost:5000/api/products${keyword}`);
                
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products. Is the server running?");
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword]); // Runs whenever the URL keyword changes

    // --- Loading & Error States ---
    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );
    
    if (error) return <div className="text-red-500 text-center text-xl mt-10">{error}</div>;

    return (
        <div>
            {/* Dynamic Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {keyword ? 'Search Results' : 'Latest Products'}
            </h1>

            {/* PRODUCT GRID - Responsive Tailwind Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div 
                        key={product._id} 
                        className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                    >
                        {/* Clickable Image Area */}
                        <Link to={`/product/${product._id}`}>
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </Link>

                        {/* Product Info */}
                        <div className="p-4 flex flex-col flex-grow">
                            <Link to={`/product/${product._id}`} className="hover:text-yellow-600 transition-colors">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                                    {product.name}
                                </h2>
                            </Link>

                            {/* Ratings (Simple Text for now) */}
                            <div className="flex items-center mb-2 text-sm text-yellow-500">
                                <span>★ {product.rating}</span>
                                <span className="text-gray-400 ml-2">({product.numReviews} reviews)</span>
                            </div>

                            {/* Price and Stock - Pushed to bottom */}
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.countInStock > 0 ? (
                                    <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="text-red-500 text-sm font-medium bg-red-100 px-2 py-1 rounded">
                                        Out of Stock
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State Message */}
            {products.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <h2>No products found matching your search.</h2>
                    <Link to="/" className="text-blue-500 underline mt-2 inline-block">Go Back Home</Link>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;