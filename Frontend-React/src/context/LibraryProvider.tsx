import React, { useState } from "react";
import {getAllBooks} from "../api/bookService.ts";
import {getAllReaders} from "../api/readerService.ts";
import type {Book} from "../types/Book.ts";
import type {Reader} from "../types/Reader.ts";
import { LibraryContext } from "./LibraryContext.ts";
import {getLendingHistory} from "../api/lendingService.ts";
import type {Lending} from "../types/Lending.ts";

interface LibraryProviderProps {
    children: React.ReactNode;
}

export const LibraryProvider = ({ children } : LibraryProviderProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [readers, setReaders] = useState<Reader[]>([]);
    const [lendings, setLendings] = useState<Lending[]>([]);

    const fetchBooks = async () => {
        try {
            const res = await getAllBooks();
            setBooks(res);
        } catch (e) {
            console.error("Failed to fetch books:", e);
        }
    };

    const fetchReaders = async () => {
        try {
            const res = await getAllReaders();
            setReaders(res);
        } catch (e) {
            console.error("Failed to fetch readers:", e);
        }
    };

    const fetchLendings = async () => {
        try {
            const res = await getLendingHistory();
            setLendings(res);
        } catch (e) {
            console.error("Failed to fetch lendings:", e);
        }
    }

    return (
        <LibraryContext.Provider value={{ books, readers, lendings, fetchBooks, fetchReaders, fetchLendings }}>
            {children}
        </LibraryContext.Provider>
    );
};
