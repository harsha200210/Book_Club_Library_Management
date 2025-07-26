import React, { useState } from 'react';
import Navbar from "../component/Navbar.tsx";
import { createReaders, deleteReaders, updateReaders } from "../api/readerService.ts";
import { useLibrary } from "../context/useLibrary.ts";
import type { Reader } from "../types/Reader.ts";

const ReaderPage: React.FC = () => {
    const { readers, fetchReaders } = useLibrary();
    const [form, setForm] = useState<Reader>({
        fullName: '',
        email: '',
        contactNumber: '',
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingId) {
                await updateReaders(editingId, form);
            } else {
                await createReaders(form);
            }
            setForm({ fullName: '', email: '', contactNumber: '' });
            setEditingId(null);
            fetchReaders();
        } catch (error) {
            console.error('Error saving reader:', error);
        }
    };

    const handleEdit = (reader: Reader) => {
        setForm(reader);
        setEditingId(reader._id || null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteReaders(id);
            fetchReaders();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredReaders = readers.filter(reader =>
        reader.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.contactNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300 mb-8">
                    <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">👥 Reader Management</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                                required
                            />
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder="Contact Number"
                                value={form.contactNumber}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                        >
                            {editingId ? 'Update Reader' : 'Add Reader'}
                        </button>
                    </form>
                </div>
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
                    <input
                        type="text"
                        placeholder="Search by name, email or contact..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 mb-6"
                    />
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl text-left">
                            <thead>
                            <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                                <th className="p-4 rounded-tl-2xl">Full Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Contact No.</th>
                                <th className="p-4 rounded-tr-2xl">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredReaders.length > 0 ? (
                                filteredReaders.map((reader) => (
                                    <tr key={reader._id} className="border-t hover:bg-gray-100 transition duration-200 text-black">
                                        <td className="p-4">{reader.fullName}</td>
                                        <td className="p-4">{reader.email}</td>
                                        <td className="p-4">{reader.contactNumber}</td>
                                        <td className="p-4 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(reader)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 font-semibold"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(reader._id || ``)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-gray-600 text-center">
                                        No readers found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReaderPage;
