import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const ProductCreateScreen = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };

            await axios.post(
                'http://localhost:5000/api/products',
                { name, price, imageUrl: image, category, countInStock, description },
                config
            );

            alert('Product Created Successfully!');
            navigate('/admin/products');
        } catch (err) {
            setError('Failed to create product. Please check fields.');
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/admin/products" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center mb-6 transition duration-200">
                  <span className="mr-2">&larr;</span> Go Back
            </Link>

            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Product</h1>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                {loading && <div className="text-blue-500 mb-4 text-center">Loading...</div>}

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Product Name" required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="https://example.com/image.jpg" required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Electronics" required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Count In Stock</label>
                        <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition duration-200">
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductCreateScreen;