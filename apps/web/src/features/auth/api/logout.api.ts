import { apiClient } from "@/lib/axios";

export async function logout() {
    await apiClient.post(
        "/auth/logout",
    );
}