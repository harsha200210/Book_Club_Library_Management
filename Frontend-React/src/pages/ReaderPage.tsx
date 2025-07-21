import React, {useEffect, useState} from 'react'
import Navbar from "../component/Navbar.tsx";
import {createReaders, deleteReaders, getAllReaders, updateReaders} from "../api/readerService.ts";

interface Reader {
    _id?: string;
    fullName: string;
    email: string;
    contactNumber: string;
}

const ReaderPage: React.FC = () => {
    const [readers, setReaders] = useState<Reader[]>([]);
    const [form, setForm] = useState<Reader>({
        fullName: '',
        email: '',
        contactNumber: '',
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchReaders = async () => {
        try {
            const res = await getAllReaders();
            setReaders(res);
        } catch (err) {
            console.error('Error fetching readers:', err);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            try {
                await updateReaders(editingId, form);
            } catch (error) {
                console.error('Error updating reader:', error);
            }

        } else {
            try {
                await createReaders(form)
            } catch (error) {
                console.error('Error creating reader:', error);
            }
        }

        setForm({ fullName: '', email: '', contactNumber: '' });
        setEditingId(null);
        fetchReaders();
    };

    const handleEdit = (reader: Reader) => {
        setForm(reader);
        setEditingId(reader._id || null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteReaders(id)
            fetchReaders();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchReaders();
    }, []);

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300 mb-8">
                    <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">🧑‍🎓 Reader Management</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                                required
                            />
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder="Contact Number"
                                value={form.contactNumber}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                        >
                            {editingId ? 'Update reader' : 'Add reader'}
                        </button>
                    </form>
                </div>
                <div className="mt-8 overflow-x-auto">
                    <table className="w-full bg-white rounded-2xl shadow-2xl text-left">
                        <thead>
                        <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-black">
                            <th className="p-4 rounded-tl-2xl">Full Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Contact No.</th>
                            <th className="p-4 rounded-tr-2xl">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {readers.map((reader) => (
                            <tr key={reader._id} className="border-t hover:bg-gray-100 transition duration-200 text-black">
                                <td className="p-4">{reader.fullName}</td>
                                <td className="p-4">{reader.email}</td>
                                <td className="p-4">{reader.contactNumber}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(reader)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(reader._id || '')}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {readers.length === 0 && (
                            <tr>
                                <td className="p-4 text-gray-600" colSpan={6}>
                                    No readers found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReaderPage
