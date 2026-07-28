import { apiClient } from "@/lib/axios";

import type {
    RefreshResponse,
} from "../types/auth.types";

export async function refreshAccessToken():
    Promise<RefreshResponse> {

    const response =
        await apiClient.post<RefreshResponse>(
            "/auth/refresh",
        );

    return response.data;
}