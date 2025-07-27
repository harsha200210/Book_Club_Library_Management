import React from "react";
import type {Reader} from "../../types/Reader.ts";

interface ReaderFormProps {
    form: Reader;
    editingId: string | null;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const ReaderForm: React.FC<ReaderFormProps> = ({ form, editingId, handleInput, handleSubmit }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.02] hover:shadow-3xl duration-300 mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
                    👥 Reader Management
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleInput}
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleInput}
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                            required
                        />
                        <input
                            type="text"
                            name="contactNumber"
                            placeholder="Contact Number"
                            value={form.contactNumber}
                            onChange={handleInput}
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        {editingId ? "Update Reader" : "Add Reader"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReaderForm;