import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const RegisterScreen = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { search } = useLocation();
    
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(
                'http://localhost:5000/api/users/register',
                { name, email, password }, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            setUser(data); 
            navigate(redirect); 
        } catch (err) {
            setError(err.response && err.response.data.message
                ? err.response.data.message
                : 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input type="text" placeholder="Enter name" value={name}
                            onChange={(e) => setName(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input type="email" placeholder="Enter email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input type="password" placeholder="Enter password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                        <input type="password" placeholder="Confirm password" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full py-2 rounded-lg text-white font-bold transition duration-200 ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-yellow-600 font-bold hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;