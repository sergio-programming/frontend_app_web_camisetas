export type UserRoles = 'admin' | 'editor';

export interface User {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    role: UserRoles;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserCreate {
    fullName: string;
    email: string;
    password: string;
    role: string;
}

export interface UserUpdate {
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
}

export interface UserResponse {
    message: string;
    user: User;
}

export interface SessionUser {
    fullName: string;
    email: string;
    role: UserRoles;
}