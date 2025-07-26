import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { createBook, deleteBook, updateBook } from "../api/bookService.ts";
import { useLibrary } from "../context/useLibrary.ts";
import type { Book } from "../types/Book.ts";

const BookPage: React.FC = () => {
    const { books, fetchBooks } = useLibrary();

    const [form, setForm] = useState<Book>({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        available: true
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingId) {
                await updateBook(editingId, form);
            } else {
                await createBook(form);
            }
            setForm({ title: '', author: '', genre: '', isbn: '', available: true });
            setEditingId(null);
            fetchBooks();
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleEdit = (book: Book) => {
        setForm(book);
        setEditingId(book._id || null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBook(id);
            fetchBooks();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300 mb-8">
                    <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">📚 Book Management</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                                required
                            />
                            <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                value={form.author}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                                required
                            />
                            <input
                                type="text"
                                name="genre"
                                placeholder="Genre"
                                value={form.genre}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                            />
                            <input
                                type="text"
                                name="isbn"
                                placeholder="ISBN"
                                value={form.isbn}
                                onChange={handleInput}
                                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                        >
                            {editingId ? 'Update Book' : 'Add Book'}
                        </button>
                    </form>
                </div>
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
                    <input
                        type="text"
                        placeholder="Search by title, author, or genre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 mb-6"
                    />
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl text-left">
                            <thead>
                            <tr className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
                                <th className="p-4 rounded-tl-2xl">Title</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Genre</th>
                                <th className="p-4">ISBN</th>
                                <th className="p-4">Available</th>
                                <th className="p-4 rounded-tr-2xl">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredBooks.map((book) => (
                                <tr key={book._id} className="border-t hover:bg-gray-100 transition duration-200 text-black">
                                    <td className="p-4">{book.title}</td>
                                    <td className="p-4">{book.author}</td>
                                    <td className="p-4">{book.genre}</td>
                                    <td className="p-4">{book.isbn}</td>
                                    <td className="p-4">{book.available ? '✅ Yes' : '❌ No'}</td>
                                    <td className="p-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book._id || '')}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredBooks.length === 0 && (
                                <tr>
                                    <td className="p-4 text-gray-600" colSpan={6}>
                                        No books found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
