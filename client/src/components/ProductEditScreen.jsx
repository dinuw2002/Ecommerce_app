import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const ProductEditScreen = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Form State
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the existing product details to pre-fill the form
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.imageUrl);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setLoading(false);
            } catch (err) {
                setError('Could not load product data');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`, // Admin Token
                },
            };

            // Send PUT request to update product
            await axios.put(
                `http://localhost:5000/api/products/${id}`,
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

            alert('Product Updated Successfully!');
            navigate('/admin/products'); // Go back to the list
        } catch (err) {
            alert('Update Failed');
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
            <Link to="/admin/products" style={{ textDecoration: 'none', color: 'gray' }}>Go Back</Link>
            
            <h1>Edit Product</h1>
            
            <form onSubmit={submitHandler}>
                
                {/* Name */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required 
                    />
                </div>

                {/* Price */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required 
                    />
                </div>

                {/* Image URL */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Image URL</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required 
                    />
                </div>

                {/* Category */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required 
                    />
                </div>

                {/* Count In Stock */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Count In Stock</label>
                    <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} 
                        style={{ width: '100%', padding: '8px' }} required 
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
                        style={{ width: '100%', padding: '8px', minHeight: '100px' }} required 
                    ></textarea>
                </div>

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default ProductEditScreen;