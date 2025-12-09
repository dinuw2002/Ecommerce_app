import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const ProductCreateScreen = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Empty initial state
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
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // Send POST request with the form data
            await axios.post(
                'http://localhost:5000/api/products',
                {
                    name,
                    price,
                    imageUrl: image,
                    category,
                    countInStock,
                    description,
                },
                config
            );

            alert('Product Created Successfully!');
            navigate('/admin/products'); // Redirect to list
        } catch (err) {
            setError('Failed to create product. Please check fields.');
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
            <Link to="/admin/products" style={{ textDecoration: 'none', color: 'gray' }}>Go Back</Link>
            
            <h1>Create New Product</h1>
            {error && <h3 style={{color: 'red'}}>{error}</h3>}
            {loading && <h3>Loading...</h3>}

            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required placeholder="Product Name"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required 
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Image URL</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required placeholder="/images/sample.jpg"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required placeholder="Electronics"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Count In Stock</label>
                    <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required 
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
                        style={{ width: '100%', padding: '8px', minHeight: '100px' }} required 
                    ></textarea>
                </div>

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default ProductCreateScreen;