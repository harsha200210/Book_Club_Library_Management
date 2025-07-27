import React from "react";
import { useLibrary } from "../context/useLibrary.ts";
import { returnBook } from "../api/lendingService.ts";
import Navbar from "../component/Navbar.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {showError} from "../utils/showToast.ts";

const ReturnBookPage = () => {
    const navigate = useNavigate();
    const { lendings } = useLibrary();
    const [selectedId, setSelectedId] = React.useState('');
    const selectedLending = lendings.find(l => l._id === selectedId && !l.isReturned);

    const handleReturn = async () => {
        if (!selectedId) return;

        try {
            await returnBook(selectedId);
            toast.success("⌛ Book returned successfully!");
            setSelectedId('');
            navigate("/dashboard")
        } catch (error) {
           showError(error)
        }
    };

    const notReturnedLendings = lendings.filter(l => !l.isReturned);

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-4xl mx-auto py-10">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl transition hover:scale-[1.02] duration-300 mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
                        ⏳ Return a Book
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Select a Book to Return
                            </label>
                            <select
                                value={selectedId}
                                onChange={(e) => setSelectedId(e.target.value)}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-500"
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
                            <div className="bg-gray-50 p-5 sm:p-6 rounded-xl shadow-md transition hover:shadow-lg">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Return Details</h3>
                                <ul className="text-sm sm:text-base text-gray-700 space-y-1">
                                    <li><strong>📘 Book:</strong> {selectedLending.book.title}</li>
                                    <li><strong>🙋 Reader:</strong> {selectedLending.reader.fullName}</li>
                                    <li><strong>📅 Due Date:</strong> {new Date(selectedLending.dueDate).toDateString()}</li>
                                </ul>
                                <button
                                    onClick={handleReturn}
                                    className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium text-base sm:text-lg"
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
