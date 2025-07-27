import { useState } from "react";
import {useLibrary} from "../../context/useLibrary.ts";

const AuditLogPage = () => {
    const { auditLogs: logs } = useLibrary();
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const filteredLogs = logs.filter((log) => {
        const query = searchTerm.toLowerCase();
        const actionMatch = log.action.toLowerCase().includes(query);
        const detailMatch = log.details.toLowerCase().includes(query);

        const logDate = new Date(log.timestamp);
        const isAfterFrom = fromDate ? logDate >= new Date(fromDate) : true;
        const isBeforeTo = toDate ? logDate <= new Date(toDate) : true;

        return (actionMatch || detailMatch) && isAfterFrom && isBeforeTo;
    });

    return (
        <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 mb-12 sm:top-10 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-800">
                📜 Audit Log History
            </h2>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 justify-center">
                <input
                    type="text"
                    placeholder="Search by action or details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-gray-500 placeholder:italic"
                />
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full sm:w-48 px-4 py-2 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full sm:w-48 px-4 py-2 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                        <th className="p-4 text-left rounded-tl-2xl">Action</th>
                        <th className="p-4 text-left">Details</th>
                        <th className="p-4 text-left rounded-tr-2xl">Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                            <tr
                                key={log._id}
                                className="border-t hover:bg-gray-100 transition text-black"
                            >
                                <td className="p-4">{log.action}</td>
                                <td className="p-4">{log.details}</td>
                                <td className="p-4">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="p-4 text-center text-gray-600">
                                No audit logs found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogPage;
