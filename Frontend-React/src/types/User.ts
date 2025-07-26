export interface User {
    _id?: string;
    name: string,
    email: string;
    password: string;
    role: 'admin' | 'staff';
    lastLogin?: Date;
}

export interface UserWithOutPassword {
    _id?: string;
    name: string;
    email: string;
    role: 'admin' | 'staff';
    lastLogin?: Date;
}