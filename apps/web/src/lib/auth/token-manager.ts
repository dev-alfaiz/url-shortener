class TokenManager {
    private accessToken: string | null = null;

    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    clear() {
        this.accessToken = null;
    }

    isAuthenticated() {
        return !!this.accessToken;
    }
}

export const tokenManager = new TokenManager();