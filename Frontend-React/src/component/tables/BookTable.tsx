import React from "react";
import type {Book} from "../../types/Book.ts";

interface BookTableProps {
    books: Book[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleEdit: (book: Book) => void;
    handleDelete: (id: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({
                                                 books,
                                                 searchTerm,
                                                 setSearchTerm,
                                                 handleEdit,
                                                 handleDelete,
                                             }) => {
    return (
        <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl transition-all hover:scale-[1.02] hover:shadow-3xl duration-300 w-full mb-6">
            <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 mb-6"
            />

            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full bg-white rounded-2xl text-left text-sm md:text-base">
                    <thead>
                    <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                        <th className="p-4">Title</th>
                        <th className="p-4">Author</th>
                        <th className="p-4">Genre</th>
                        <th className="p-4">ISBN</th>
                        <th className="p-4">Available</th>
                        <th className="p-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr
                            key={book._id}
                            className="border-t hover:bg-gray-100 transition duration-200 text-black"
                        >
                            <td className="p-4">{book.title}</td>
                            <td className="p-4">{book.author}</td>
                            <td className="p-4">{book.genre}</td>
                            <td className="p-4">{book.isbn}</td>
                            <td className="p-4">{book.available ? "✅ Yes" : "❌ No"}</td>
                            <td className="p-4">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 font-semibold transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book._id || "")}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 font-semibold transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {books.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-600">
                                No books found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookTable;
