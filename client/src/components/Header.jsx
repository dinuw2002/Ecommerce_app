import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import SearchBox from './SearchBox';

const Header = () => {
    const { user, logout } = useContext(UserContext); 
    const { cartItems } = useContext(CartContext);

    return (
        <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition duration-300">
                    TechShop<span className="text-yellow-500">.</span>
                </Link>

                <div className="hidden md:block mx-auto">
                     <SearchBox />
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6">
                    
                    {/* Cart Link with Badge */}
                    <Link to="/cart" className="relative hover:text-yellow-500 transition duration-300 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Cart</span>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {/* User Links */}
                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Admin Dashboard Link */}
                            {user.isAdmin && (
                                <Link 
                                    to="/admin/dashboard" 
                                    className="bg-yellow-600 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded shadow transition"
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            <span className="text-gray-300 hidden md:block">Hi, {user.name}</span>
                            
                            <button 
                                onClick={logout} 
                                className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-1.5 rounded transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="hover:text-yellow-500 transition">Sign In</Link>
                            <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded transition">Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;