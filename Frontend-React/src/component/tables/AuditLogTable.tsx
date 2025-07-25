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
        <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300 mb-8 top-10">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">📜 Audit Log History</h2>
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by action or details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder:text-gray-500 placeholder:italic"
                />
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full sm:w-48 px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full sm:w-48 px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
            </div>
            <div className="mt-8 overflow-x-auto max-h-96">
                <table className="w-full bg-white rounded-2xl shadow-2xl ">
                    <thead>
                    <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                        <th className="p-4 rounded-tl-2xl text-left">Action</th>
                        <th className="p-4 text-left">Details</th>
                        <th className="p-4 rounded-tr-2xl text-left">Timestamp</th>
                    </tr>
                    </thead>
                    <tbody className="max-h-80 overflow-y-auto">
                    {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                            <tr key={log._id} className="border-t hover:bg-gray-100 transition duration-200 text-black">
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
