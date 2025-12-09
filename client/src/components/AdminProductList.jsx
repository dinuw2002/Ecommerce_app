import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AdminProductList = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Config for authorized requests
    const config = {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load products');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) {
            fetchProducts();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    // --- HANDLERS ---

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);
                fetchProducts(); 
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2 style={{color: 'red'}}>{error}</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Products</h1>
                
                
                <Link to="/admin/product/create">
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
                    >
                        + Create Product
                    </button>
                </Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>NAME</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>PRICE</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>CATEGORY</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{product._id}</td>
                            <td style={{ padding: '10px' }}>{product.name}</td>
                            <td style={{ padding: '10px' }}>${product.price}</td>
                            <td style={{ padding: '10px' }}>{product.category}</td>
                            <td style={{ padding: '10px' }}>
                                {/* Edit Button */}
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <button style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                                </Link>
                                
                                {/* Delete Button */}
                                <button 
                                    onClick={() => deleteHandler(product._id)}
                                    style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductList;