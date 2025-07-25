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
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <div className="relative bg-white p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300 mb-8">
                    <h1 className="text-3xl font-extrabold mb-4 text-center text-gray-800">📊 Welcome to Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative bg-white p-6 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
                        <h2 className="text-xl font-extrabold text-gray-800 mb-2">📚 Total Books</h2>
                        <p className="text-gray-600">{books.length}</p>
                    </div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
                        <h2 className="text-xl font-extrabold text-gray-800 mb-2">👥 Registered Readers</h2>
                        <p className="text-gray-600">{readers.length}</p>
                    </div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
                        <h2 className="text-xl font-extrabold text-gray-800 mb-2">⏳ Books Lent Out</h2>
                        <p className="text-gray-600">{lentOutBooks.length}</p>
                    </div>
                </div>
                <AuditLogTable />
            </div>
        </div>
    );
};

export default Dashboard;
