import apiClient from "./apiClient.ts";
import type {AuditLog} from "../types/AuditLog.ts";

export const getAllAuditLog = async (): Promise<AuditLog[]> => {
    const response = await apiClient.get("/audit")
    return response.data
}