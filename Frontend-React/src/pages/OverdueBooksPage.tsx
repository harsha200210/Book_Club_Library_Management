import {useEffect, useState} from "react";
import Navbar from "../component/Navbar.tsx";
import {getOverDueLend} from "../api/lendingService.ts";
import type {Lending} from "../types/Lending.ts";
import {showError} from "../utils/showToast.ts";

const OverdueBooksPage = () => {
    const [overdueLendings, setOverdueLendings] = useState<Lending[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchOverdueLendings = async () => {
            try {
                const data = await getOverDueLend();
                setOverdueLendings(data);
            } catch (error) {
                showError(error)
            }
        };

        fetchOverdueLendings();
    }, []);

    const filteredLendings = overdueLendings.filter((lending) => {
        const bookTitle = lending.book.title.toLowerCase();
        const readerName = lending.reader.fullName.toLowerCase();
        const query = searchTerm.toLowerCase();
        return bookTitle.includes(query) || readerName.includes(query);
    });

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-6xl mx-auto py-10">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                        ⚠️ Overdue Books
                    </h2>
                    <input
                        type="text"
                        placeholder="Search by book or reader..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg outline-none text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-sm md:text-base rounded-2xl">
                            <thead>
                            <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white text-left">
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
                                        No overdue books found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLendings.map((lending) => (
                                    <tr
                                        key={lending._id}
                                        className="border-t hover:bg-gray-100 transition duration-200"
                                    >
                                        <td className="p-4 text-gray-800">{lending.book.title}</td>
                                        <td className="p-4 text-gray-800">{lending.reader.fullName}</td>
                                        <td className="p-4 text-gray-700">
                                            {new Date(lending.lendDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-red-600 font-semibold">
                                            {new Date(lending.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-red-600 font-semibold">Overdue</td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverdueBooksPage;
