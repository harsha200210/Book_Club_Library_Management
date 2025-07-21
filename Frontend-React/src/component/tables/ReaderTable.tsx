import React from 'react'

const dummyReaders = [
    { id: 1, fullName: 'John Doe', email: 'john@example.com' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com' },
]

const ReaderTable: React.FC<{ onEdit: (reader: any) => void }> = ({ onEdit }) => {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this reader?')) {
            console.log('Deleted reader:', id);
        }
    };
    return (
        <div className="mt-8 overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-2xl text-left">
                <thead>
                <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                    <th className="p-4 rounded-tl-2xl">Full Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4 rounded-tr-2xl">Actions</th>
                </tr>
                </thead>
                <tbody>
                {dummyReaders.map((reader) => (
                    <tr key={reader.id} className="border-t hover:bg-gray-100 transition duration-200">
                        <td className="p-4">{reader.fullName}</td>
                        <td className="p-4">{reader.email}</td>
                        <td className="p-4 space-x-2">
                            <button
                                onClick={() => onEdit(reader)}
                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(reader.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200 font-semibold"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                {dummyReaders.length === 0 && (
                    <tr>
                        <td className="p-4 text-gray-600" colSpan={3}>
                            No readers found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ReaderTable
