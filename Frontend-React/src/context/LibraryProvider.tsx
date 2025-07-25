import React, { useState } from "react";
import {getAllBooks} from "../api/bookService.ts";
import {getAllReaders} from "../api/readerService.ts";
import type {Book} from "../types/Book.ts";
import type {Reader} from "../types/Reader.ts";
import { LibraryContext } from "./LibraryContext.ts";
import {getLendingHistory} from "../api/lendingService.ts";
import type {Lending} from "../types/Lending.ts";
import type {AuditLog} from "../types/AuditLog.ts";
import {getAllAuditLog} from "../api/auditService.ts";

interface LibraryProviderProps {
    children: React.ReactNode;
}

export const LibraryProvider = ({ children } : LibraryProviderProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [readers, setReaders] = useState<Reader[]>([]);
    const [lendings, setLendings] = useState<Lending[]>([]);
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])

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

    const fetchAuditLogs = async () => {
        try {
            const res = await getAllAuditLog();
            setAuditLogs(res)
        } catch (e) {
            console.error("Faild to fetch audit logs", e)
        }
    }

    return (
        <LibraryContext.Provider value={{ books, readers, lendings, auditLogs, fetchBooks, fetchReaders, fetchLendings, fetchAuditLogs }}>
            {children}
        </LibraryContext.Provider>
    );
};
