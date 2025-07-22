import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {logout} from "../api/authService.ts";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white px-6 py-4 shadow-2xl">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-2xl font-extrabold hover:text-indigo-200">
                    📚 Book-Club
                </Link>
                <ul className="flex gap-6 text-lg font-medium">
                    <li>
                        <Link to="/dashboard" className="hover:text-indigo-200 transition duration-200">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/books" className="hover:text-indigo-200 transition duration-200">Books</Link>
                    </li>
                    <li>
                        <Link to="/readers" className="hover:text-indigo-200 transition duration-200">Readers</Link>
                    </li>
                    <li className="relative group">
                        <button className="hover:text-indigo-200 transition duration-200">
                            Lending
                        </button>
                        <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 z-50">
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
                    </li>
                    <li>
                        <Link to="/profile" className="hover:text-indigo-200 transition duration-200">Profile</Link>
                    </li>
                    <li>
                        <button
                            onClick={async () => {
                                try {
                                    await logout()
                                    navigate("/")
                                } catch (error) {
                                    console.log()
                                }
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
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
