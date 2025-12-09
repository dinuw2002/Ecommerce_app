import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            // Redirect to home page with the keyword in the query string
            navigate(`/?keyword=${keyword}`);
        } else {
            // If empty, just go home
            navigate('/');
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex items-center">
            <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 w-48 md:w-64 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r-lg transition duration-200"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBox;