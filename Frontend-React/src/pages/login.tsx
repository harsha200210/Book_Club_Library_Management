import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../api/authService.ts";
import {useAuth} from "../context/useAuth.ts";
import axios from "axios";
import {toast} from "react-toastify";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const { login: authenticate } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await login({ email, password });
            authenticate(user.accessToken);

            navigate("/dashboard");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong")
            }
        }
    };

    return (
        <div
            className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <div
                className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl duration-300">

                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Library Login</h2>

                {/*{error && (*/}
                {/*    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm animate-pulse">*/}
                {/*        {error}*/}
                {/*    </div>*/}
                {/*)}*/}

                <form onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to='/signup'
                        className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
