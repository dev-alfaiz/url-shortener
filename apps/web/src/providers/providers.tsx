"use client";

import { QueryProvider } from "./query-provider";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return <QueryProvider>{children}</QueryProvider>;
}