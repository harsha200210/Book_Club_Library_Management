import apiClient from "./apiClient.ts";
import type {Lending} from "../types/Lending.ts";

export const lendBook = async (book: string, reader: string): Promise<void> => {
    await apiClient.post("/lending/lend", { book, reader });
}

export const getLendingHistory = async (): Promise<Lending[]> => {
    const res = await apiClient.get("/lending/history");
    return res.data;
}

export const returnBook = async (id: string): Promise<void> => {
    await apiClient.post(`/lending/return/${id}`);
}

export const getOverDueLend = async (): Promise<Lending[]> => {
    const res = await apiClient.get("/lending/overdue");
    return res.data;
}