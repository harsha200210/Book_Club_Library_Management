import {useLibrary} from "../context/useLibrary.ts";
import Navbar from "../component/Navbar.tsx";
import React from "react";
import {lendBook} from "../api/lendingService.ts";
import {useNavigate} from "react-router-dom";

const LendBookPage = () => {
    const navigate = useNavigate();
    const { books, readers } = useLibrary();
    const [selectedBook, setSelectedBook] = React.useState('');
    const [selectedReader, setSelectedReader] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await lendBook(selectedBook, selectedReader);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error lending book:", error);
            alert("Failed to lend book. Please try again.");
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300 mb-8">
                    <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">📚 Lend a Book</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Select Book</label>
                            <select
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                                value={selectedBook}
                                onChange={(e) => setSelectedBook(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a book</option>
                                {books
                                    .filter((b) => b.available)
                                    .map((book) => (
                                        <option key={book._id} value={book._id}>
                                            {book.title}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Select Reader</label>
                            <select
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                                value={selectedReader}
                                onChange={(e) => setSelectedReader(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a reader</option>
                                {readers.map((reader) => (
                                    <option key={reader._id} value={reader._id}>
                                        {reader.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                        >
                            Lend Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LendBookPage;
