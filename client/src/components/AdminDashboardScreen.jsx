import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AdminDashboardScreen = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Security Check: Redirect non-admins or logged-out users
    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Prevent flashing content before redirect happens
    if (!user || !user.isAdmin) return null;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Admin Dashboard</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                Welcome back, <strong>{user.name}</strong>. What would you like to manage today?
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* CARD 1: Product Management */}
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <h3>📦 Products</h3>
                    <p>View, create, edit, or delete products from the store inventory.</p>
                    <Link to="/admin/products">
                        <button style={{ 
                            marginTop: '10px', 
                            padding: '10px 15px', 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                        }}>
                            Manage Products
                        </button>
                    </Link>
                </div>

                {/* CARD 2: Placeholder for Orders (Future Feature) */}
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9', color: '#888' }}>
                    <h3>📈 Orders</h3>
                    <p>View customer orders and update shipping status.</p>
                    <button disabled style={{ 
                        marginTop: '10px', 
                        padding: '10px 15px', 
                        cursor: 'not-allowed' 
                    }}>
                        Coming Soon
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardScreen;