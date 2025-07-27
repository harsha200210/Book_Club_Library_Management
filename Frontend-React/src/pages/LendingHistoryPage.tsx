import { useState } from "react";
import { useLibrary } from "../context/useLibrary.ts";
import Navbar from "../component/Navbar.tsx";

const LendingHistoryPage = () => {
    const { lendings } = useLibrary();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLendings = lendings.filter((lending) => {
        const bookTitle = lending.book.title.toLowerCase();
        const readerName = lending.reader.fullName.toLowerCase();
        const status = lending.isReturned ? "returned" : "not returned";
        const query = searchTerm.toLowerCase();

        return (
            bookTitle.includes(query) ||
            readerName.includes(query) ||
            status.includes(query)
        );
    });

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4 pb-8">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-2xl transition-all hover:scale-[1.02] hover:shadow-3xl duration-300 mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
                        📚 Lending History
                    </h2>
                    <input
                        type="text"
                        placeholder="Search by book, reader, or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                    />

                    {/* Desktop Table View */}
                    <div className="hidden md:block mt-8 overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-2xl text-left">
                            <thead>
                            <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                                <th className="p-4 rounded-tl-2xl">Book</th>
                                <th className="p-4">Reader</th>
                                <th className="p-4">Lend Date</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4 rounded-tr-2xl">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredLendings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-600">
                                        No results found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLendings.map((lending) => (
                                    <tr
                                        key={lending._id}
                                        className="border-t hover:bg-gray-100 transition duration-200 text-black"
                                    >
                                        <td className="p-4">{lending.book.title}</td>
                                        <td className="p-4">{lending.reader.fullName}</td>
                                        <td className="p-4">
                                            {new Date(lending.lendDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            {new Date(lending.dueDate).toLocaleDateString()}
                                        </td>
                                        <td
                                            className={`p-4 font-semibold ${
                                                lending.isReturned
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {lending.isReturned ? "Returned" : "Not Returned"}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden mt-8 space-y-4">
                        {filteredLendings.length === 0 ? (
                            <p className="text-center text-gray-600">No results found.</p>
                        ) : (
                            filteredLendings.map((lending) => (
                                <div
                                    key={lending._id}
                                    className="bg-gray-100 rounded-xl p-4 shadow hover:bg-gray-200 transition duration-200 text-black"
                                >
                                    <p>
                                        <span className="font-semibold text-gray-700">📖 Book:</span>{" "}
                                        {lending.book.title}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">👤 Reader:</span>{" "}
                                        {lending.reader.fullName}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">📅 Lend Date:</span>{" "}
                                        {new Date(lending.lendDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">⏳ Due Date:</span>{" "}
                                        {new Date(lending.dueDate).toLocaleDateString()}
                                    </p>
                                    <p
                                        className={`font-semibold ${
                                            lending.isReturned ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {lending.isReturned ? "✅ Returned" : "❌ Not Returned"}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LendingHistoryPage;
