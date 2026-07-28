import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login, getCurrentUser } from "../api";
import { tokenManager } from "@/lib/auth/token-manager";
import { queryKeys } from "@/constants/query-keys";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,

        onSuccess: async ({ accessToken }) => {
            tokenManager.setAccessToken(accessToken);

            await queryClient.ensureQueryData({
                queryKey: queryKeys.currentUser,
                queryFn: getCurrentUser,
            });
        },
    });
}