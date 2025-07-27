import React, {useEffect} from 'react';
import Navbar from '../component/Navbar';
import {useLibrary} from "../context/useLibrary.ts";
import AuditLogTable from "../component/tables/AuditLogTable.tsx";

const Dashboard: React.FC = () => {
    const {fetchBooks, fetchReaders, fetchLendings, fetchAuditLogs, books, readers, lendings} = useLibrary();
    const lentOutBooks = lendings.filter((l) => !l.isReturned); // assuming `returned: boolean`

    useEffect(() => {
        fetchReaders();
        fetchBooks();
        fetchLendings();
        fetchAuditLogs();
    }, []);

    return (
        <div className="h-full w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Header Card */}
                <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 transform transition duration-300 hover:scale-[1.02]">
                    <h1 className="text-3xl font-bold text-center text-gray-800">📊 Welcome to Dashboard</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform hover:scale-105">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">📚 Total Books</h2>
                        <p className="text-gray-600 text-lg">{books.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform hover:scale-105">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">👥 Registered Readers</h2>
                        <p className="text-gray-600 text-lg">{readers.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform hover:scale-105">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">⏳ Books Lent Out</h2>
                        <p className="text-gray-600 text-lg">{lentOutBooks.length}</p>
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="mt-10">
                    <AuditLogTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
