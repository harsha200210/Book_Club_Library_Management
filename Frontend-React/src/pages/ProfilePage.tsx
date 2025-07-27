import { useEffect, useState } from 'react';
import type { UserWithOutPassword } from '../types/User.ts';
import { getAllUsers, changePassword } from '../api/authService.ts';
import Navbar from "../component/Navbar.tsx";
import {showError} from "../utils/showToast.ts";
import {toast} from "react-toastify";

const ProfilePage = () => {
    const [users, setUsers] = useState<UserWithOutPassword[]>([]);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserWithOutPassword | null>(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try{
            const res = await getAllUsers();
            setUsers(res);
        } catch (e) {
            showError(e)
        }
    };

    const handlePasswordChange = async () => {
        if (!selectedUser || !currentPassword || !newPassword) return;

        try {
            await changePassword({
                userId: selectedUser._id || '',
                currentPassword,
                newPassword,
            });

            toast.success("🗝️ Password change successfully")
            setSelectedUser(null);
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            showError(error)
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-2 sm:px-4">
            <Navbar />
            <div className="max-w-6xl mx-auto py-6 sm:py-10">
                <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
                        👥 User Management
                    </h2>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        className="w-full px-4 py-2 sm:py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 mb-6"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm sm:text-base text-left text-gray-700">
                            <thead>
                            <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                                <th className="p-3 sm:p-4 rounded-tl-2xl">Name</th>
                                <th className="p-3 sm:p-4">Email</th>
                                <th className="p-3 sm:p-4 text-center">Role</th>
                                <th className="p-3 sm:p-4 text-center">Last Login</th>
                                <th className="p-3 sm:p-4 rounded-tr-2xl text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="p-3 sm:p-4">{user.name}</td>
                                    <td className="p-3 sm:p-4">{user.email}</td>
                                    <td className="p-3 sm:p-4 text-center">{user.role}</td>
                                    <td className="p-3 sm:p-4 text-center">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}
                                    </td>
                                    <td className="p-3 sm:p-4 text-center">
                                        <button
                                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 font-medium"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            Change Password
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-600">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-white w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-xl">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
                                Change Password for <span className="text-blue-600">{selectedUser.name}</span>
                            </h3>
                            <input
                                type="password"
                                placeholder="Current Password"
                                className="w-full px-4 py-2 sm:py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 mb-3"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full px-4 py-2 sm:py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 mb-4"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-300 text-gray-800 px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-400"
                                    onClick={() => {
                                        setSelectedUser(null);
                                        setCurrentPassword('');
                                        setNewPassword('');
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-600 text-white px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700"
                                    onClick={handlePasswordChange}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
