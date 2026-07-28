import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";

import { getCurrentUser } from "../api/me.api";

export function useCurrentUser() {
    return useQuery({
        queryKey: queryKeys.currentUser,
        queryFn: getCurrentUser,
    });
}