import { apiClient } from "@/lib/axios";
import type { LoginFormData } from "../validation/login.schema";

export async function login(data: LoginFormData) {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
}