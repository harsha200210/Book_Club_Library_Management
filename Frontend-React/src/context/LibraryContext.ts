import type {Book} from "../types/Book.ts";
import type {Reader} from "../types/Reader.ts";
import {createContext} from "react";
import type {Lending} from "../types/Lending.ts";
import type {AuditLog} from "../types/AuditLog.ts";

export interface LibraryContextType {
    books: Book[];
    readers: Reader[];
    lendings: Lending[];
    auditLogs: AuditLog[];
    fetchBooks: () => Promise<void>;
    fetchReaders: () => Promise<void>;
    fetchLendings: () => Promise<void>;
    fetchAuditLogs: () => Promise<void>
}

export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);