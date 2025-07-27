import React from "react";
import type {Reader} from "../../types/Reader.ts";

interface ReaderTableProps {
    readers: Reader[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleEdit: (reader: Reader) => void;
    handleDelete: (id: string) => void;
}

const ReaderTable: React.FC<ReaderTableProps> = ({ readers, searchTerm, setSearchTerm, handleEdit, handleDelete }) => {
    const filteredReaders = readers.filter(reader =>
        reader.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.contactNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-2xl transition-all hover:scale-[1.01] hover:shadow-3xl duration-300">
            <input
                type="text"
                placeholder="Search by name, email or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 mb-6"
            />

            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-2xl text-left min-w-[640px]">
                    <thead>
                    <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white text-sm sm:text-base">
                        <th className="p-4 rounded-tl-2xl">Full Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Contact No.</th>
                        <th className="p-4 rounded-tr-2xl">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredReaders.length > 0 ? (
                        filteredReaders.map((reader) => (
                            <tr
                                key={reader._id}
                                className="border-t hover:bg-gray-100 transition duration-200 text-sm sm:text-base text-black"
                            >
                                <td className="p-4">{reader.fullName}</td>
                                <td className="p-4">{reader.email}</td>
                                <td className="p-4">{reader.contactNumber}</td>
                                <td className="p-4">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => handleEdit(reader)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(reader._id || "")
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={4}
                                className="p-4 text-gray-600 text-center"
                            >
                                No readers found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReaderTable;