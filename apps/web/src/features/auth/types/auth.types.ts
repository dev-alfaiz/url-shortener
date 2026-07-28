export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RefreshResponse {
    accessToken: string;
}

export interface ApiError {
    message: string;
    statusCode: number;
}