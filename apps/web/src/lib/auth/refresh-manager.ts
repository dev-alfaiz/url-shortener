// refresh-manager.ts

import { refreshAccessToken } from "@/features/auth/api/refresh.api";
import { tokenManager } from "./token-manager";

class RefreshManager {
    private refreshPromise: Promise<string> | null = null;

    async refresh(): Promise<string> {
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = this.executeRefresh();

        try {
            return await this.refreshPromise;
        } finally {
            this.refreshPromise = null;
        }
    }

    private async executeRefresh(): Promise<string> {
        const response = await refreshAccessToken();

        tokenManager.setAccessToken(response.accessToken);

        return response.accessToken;
    }
}

export const refreshManager = new RefreshManager();