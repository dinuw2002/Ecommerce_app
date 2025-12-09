import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );
    
    if (error) return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-block mb-6 text-gray-600 hover:text-gray-900 font-semibold transition">
                &larr; Go Back
            </Link>

            {/* Main Layout: 2 Columns on Desktop, 1 on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* LEFT: Image */}
                <div className="flex justify-center">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full max-w-md rounded-lg shadow-lg object-cover"
                    />
                </div>

                {/* RIGHT: Details & Actions */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500 text-lg mr-2">★ {product.rating}</span>
                        <span className="text-gray-500">({product.numReviews} reviews)</span>
                    </div>

                    <p className="text-2xl font-bold text-gray-800 mb-4">${product.price.toFixed(2)}</p>

                    <p className="text-gray-600 leading-relaxed mb-8 border-b pb-6">
                        {product.description}
                    </p>

                    {/* Add to Cart Card */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-sm">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <span className="font-semibold text-gray-700">Price:</span>
                            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <span className="font-semibold text-gray-700">Status:</span>
                            {product.countInStock > 0 ? (
                                <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">In Stock</span>
                            ) : (
                                <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded">Out of Stock</span>
                            )}
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-semibold text-gray-700">Qty:</span>
                                <select 
                                    value={qty} 
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button 
                            onClick={handleAddToCart}
                            disabled={product.countInStock === 0}
                            className={`w-full py-3 rounded-lg text-white font-bold uppercase tracking-wide transition duration-300 ${
                                product.countInStock > 0 
                                    ? 'bg-yellow-500 hover:bg-yellow-600 shadow-md hover:shadow-lg' 
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailScreen;