import type {Book} from "./Book.ts";
import type {Reader} from "./Reader.ts";

export interface Lending {
    _id?: string;
    book: Book;
    reader: Reader;
    lendDate: Date;
    dueDate: Date;
    returnDate?: Date;
    isReturned: boolean;
}