import React, { useState } from 'react';
import Navbar from "../component/Navbar";
import { createReaders, deleteReaders, updateReaders } from "../api/readerService";
import { useLibrary } from "../context/useLibrary";
import type { Reader } from "../types/Reader";
import { toast } from "react-toastify";
import { showError } from "../utils/showToast";
import ReaderForm from "../component/forms/ReaderForm.tsx";
import ReaderTable from "../component/tables/ReaderTable.tsx";

const ReaderPage: React.FC = () => {
    const { readers, fetchReaders } = useLibrary();
    const [form, setForm] = useState<Reader>({ fullName: '', email: '', contactNumber: '' });
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
                await updateReaders(editingId, form);
                toast.success("👥 Reader updated successfully");
            } else {
                await createReaders(form);
                toast.success("👥 Reader added successfully");
            }
            setForm({ fullName: '', email: '', contactNumber: '' });
            setEditingId(null);
            fetchReaders();
        } catch (error) {
            showError(error);
        }
    };

    const handleEdit = (reader: Reader) => {
        setForm(reader);
        setEditingId(reader._id || null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteReaders(id);
            toast.success("🗑️ Reader deleted successfully");
            fetchReaders();
        } catch (err) {
            showError(err);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
            <Navbar />

            <div className="w-full px-4 py-6 md:py-10">
                <div className="max-w-6xl mx-auto space-y-8">
                    <ReaderForm
                        form={form}
                        editingId={editingId}
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                    />

                    <div className="w-full bg-white rounded-xl shadow-xl p-4 md:p-6 overflow-x-auto">
                        <ReaderTable
                            readers={readers}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReaderPage;
