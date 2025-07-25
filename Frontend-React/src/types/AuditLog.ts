export interface AuditLog {
    _id: string;
    action: string;
    details: string;
    timestamp: Date;
}
