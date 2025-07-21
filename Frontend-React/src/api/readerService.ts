import type {Reader} from "../types/Reader.ts";
import apiClient from "./apiClient.ts";

export const getAllReaders = async () : Promise<Reader[]> => {
    const response = await apiClient.get("/readers");
    return response.data;
}

export const createReaders = async (readerData: Omit<Reader, "_id">): Promise<Reader> => {
    const response = await apiClient.post("/readers", readerData);
    return response.data;
}

export const updateReaders = async (_id: string, readerData: Omit<Reader, "_id">): Promise<Reader> => {
    const response = await apiClient.put(`/readers/${_id}`, readerData);
    return response.data;
}

export const deleteReaders = async (_id: string): Promise<void> => {
    await apiClient.delete(`/readers/${_id}`);
}