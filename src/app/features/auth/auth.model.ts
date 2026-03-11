import { User, SessionUser } from "../users/user.model";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    accessToken: string;
    user: SessionUser;
}

export interface AuthSession {
    accessToken: string;
    session: SessionUser;
}