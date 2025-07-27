import React from "react";
import type {Book} from "../../types/Book.ts";

interface BookFormProps {
    form: Book;
    editingId: string | null;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const BookForm: React.FC<BookFormProps> = ({
                                               form,
                                               editingId,
                                               handleInput,
                                               handleSubmit,
                                           }) => {
    return (
        <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.02] hover:shadow-3xl duration-300 mb-10 w-full">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
                📚 Book Management
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg"
                >
                    {editingId ? "Update Book" : "Add Book"}
                </button>
            </form>
        </div>
    );
};

export default BookForm;
