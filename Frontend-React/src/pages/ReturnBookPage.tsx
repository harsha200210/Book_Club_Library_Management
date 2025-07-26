import React from "react";
import toast from "react-hot-toast";
import { useLibrary } from "../context/useLibrary.ts";
import { returnBook } from "../api/lendingService.ts";
import Navbar from "../component/Navbar.tsx";
import {useNavigate} from "react-router-dom";

const ReturnBookPage = () => {
    const navigate = useNavigate();
    const { lendings } = useLibrary();
    const [selectedId, setSelectedId] = React.useState('');
    const selectedLending = lendings.find(l => l._id === selectedId && !l.isReturned);

    const handleReturn = async () => {
        if (!selectedId) return;

        try {
            await returnBook(selectedId);
            toast.success("Book returned successfully!");
            setSelectedId('');
            navigate("/dashboard")
        } catch (error) {
            console.error("Return error:", error);
            toast.error("Failed to return book.");
        }
    };

    const notReturnedLendings = lendings.filter(l => !l.isReturned);

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300 mb-8">
                    <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">⏳ Return a Book</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Select a Book to Return</label>
                            <select
                                value={selectedId}
                                onChange={(e) => setSelectedId(e.target.value)}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                            >
                                <option value="" disabled>-- Choose a Book --</option>
                                {notReturnedLendings.map(lending => (
                                    <option key={lending._id} value={lending._id}>
                                        {lending.book.title} — {lending.reader.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedLending && (
                            <div className="relative bg-white p-6 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
                                <h2 className="text-xl font-extrabold text-gray-800 mb-2">Return Details</h2>
                                <p className="text-gray-600"><strong>Book:</strong> {selectedLending.book.title}</p>
                                <p className="text-gray-600"><strong>Reader:</strong> {selectedLending.reader.fullName}</p>
                                <p className="text-gray-600"><strong>Due Date:</strong> {new Date(selectedLending.dueDate).toDateString()}</p>
                                <button
                                    onClick={handleReturn}
                                    className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                                >
                                    Confirm Return
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnBookPage;
