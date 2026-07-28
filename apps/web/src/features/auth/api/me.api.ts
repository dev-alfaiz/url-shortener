import { apiClient } from "@/lib/axios";

import type {
  User,
} from "../types/auth.types";

export async function getCurrentUser():
Promise<User> {

  const response =
    await apiClient.get<User>(
      "/auth/me",
    );

  return response.data;
}