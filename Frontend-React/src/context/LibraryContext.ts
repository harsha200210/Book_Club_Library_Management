import type {Book} from "../types/Book.ts";
import type {Reader} from "../types/Reader.ts";
import {createContext} from "react";
import type {Lending} from "../types/Lending.ts";

export interface LibraryContextType {
    books: Book[];
    readers: Reader[];
    lendings: Lending[];
    fetchBooks: () => Promise<void>;
    fetchReaders: () => Promise<void>;
    fetchLendings: () => Promise<void>;
}

export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);