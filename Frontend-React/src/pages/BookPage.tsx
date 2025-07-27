import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { createBook, deleteBook, updateBook } from "../api/bookService.ts";
import { useLibrary } from "../context/useLibrary.ts";
import type { Book } from "../types/Book.ts";
import { toast } from "react-toastify";
import { showError } from "../utils/showToast.ts";
import BookForm from "../component/forms/BookForm.tsx";
import BookTable from "../component/tables/BookTable.tsx";

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
                toast.success("📘 Book updated successfully");
            } else {
                await createBook(form);
                toast.success("📗 Book added successfully");
            }
            setForm({ title: '', author: '', genre: '', isbn: '', available: true });
            setEditingId(null);
            fetchBooks();
        } catch (error) {
            showError(error);
        }
    };

    const handleEdit = (book: Book) => {
        setForm(book);
        setEditingId(book._id || null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBook(id);
            toast.success("🗑️ Book deleted successfully");
            fetchBooks();
        } catch (err) {
            showError(err);
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
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <BookForm
                    form={form}
                    editingId={editingId}
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                />
                <BookTable
                    books={filteredBooks}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default BookPage;
