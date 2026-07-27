import { useQuery } from "@tanstack/react-query";

import { getUrls } from "../api/urls.api";

export function useUrls() {
  return useQuery({
    queryKey: ["urls"],
    queryFn: getUrls,
  });
}