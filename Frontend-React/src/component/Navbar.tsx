import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/authService.ts';
import {showError} from "../utils/showToast.ts";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLendingOpen, setIsLendingOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            showError(error)
        }
    };

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white px-4 py-3 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/dashboard" className="text-2xl font-bold hover:text-indigo-200">
                    📚 Book-Club
                </Link>

                {/* Hamburger Button */}
                <button
                    className="lg:hidden bg-indigo-900 hover:bg-indigo-800 hover:scale-110 transition duration-200 rounded-lg p-2 shadow-md focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path
                                fillRule="evenodd"
                                d="M18.36 6.64a1 1 0 10-1.41-1.41L12 10.17 7.05 5.23a1 1 0 00-1.41 1.41L10.59 12l-4.95 4.95a1 1 0 101.41 1.41L12 13.83l4.95 4.95a1 1 0 001.41-1.41L13.41 12l4.95-4.95z"
                                clipRule="evenodd"
                            />
                        ) : (
                            <path
                                fillRule="evenodd"
                                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                                clipRule="evenodd"
                            />
                        )}
                    </svg>
                </button>

                {/* Menu */}
                <ul className={`lg:flex gap-6 text-base font-medium ${isOpen ? 'block mt-4 lg:mt-0' : 'hidden lg:flex'} transition-all`}>
                    <li>
                        <Link to="/dashboard" className="hover:text-indigo-200 block py-2">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/books" className="hover:text-indigo-200 block py-2">Books</Link>
                    </li>
                    <li>
                        <Link to="/readers" className="hover:text-indigo-200 block py-2">Readers</Link>
                    </li>

                    {/* Lending Dropdown */}
                    <li className="relative">
                        <button
                            onClick={() => setIsLendingOpen(!isLendingOpen)}
                            className="hover:text-indigo-200 block py-2"
                        >
                            Lending
                        </button>
                        {isLendingOpen && (
                            <ul className="absolute left-1/4 transform -translate-x-1/2 mt-1 bg-white text-gray-800 shadow-lg rounded-lg w-40 z-50">
                                <li>
                                    <Link to="/lending/lend" className="block px-4 py-2 hover:bg-indigo-100">Lend Book</Link>
                                </li>
                                <li>
                                    <Link to="/lending/return" className="block px-4 py-2 hover:bg-indigo-100">Return Book</Link>
                                </li>
                                <li>
                                    <Link to="/lending/history" className="block px-4 py-2 hover:bg-indigo-100">Lending History</Link>
                                </li>
                                <li>
                                    <Link to="/lending/overdue" className="block px-4 py-2 hover:bg-indigo-100">Overdue Books</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/profile" className="hover:text-indigo-200 block py-2">Profile</Link>
                    </li>

                    <li>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-600 text-white px-4 py-2 mt-2 lg:mt-0 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold block"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
