import { apiClient } from "@/lib/axios";

export async function getUrls() {
    const response = await apiClient.get("/urls");

    return response.data;
}

export async function createShortUrl() { }

export async function updateShortUrl() { }

export async function deleteShortUrl() { }

export async function getAnalytics() { }