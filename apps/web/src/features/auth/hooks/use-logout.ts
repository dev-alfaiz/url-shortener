import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../api";
import { tokenManager } from "@/lib/auth/token-manager";
import { queryKeys } from "@/constants/query-keys";

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,

        onSettled: async () => {
            tokenManager.clear();

            await queryClient.removeQueries({
                queryKey: queryKeys.currentUser,
            });
        },
    });
}