"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "../hooks";

interface AuthGuardProps {
    children: ReactNode;
}

export function AuthGuard({
    children,
}: AuthGuardProps) {
    const router = useRouter();

    const {
        data: user,
        isLoading,
    } = useCurrentUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/login");
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        // return <FullScreenLoader />;
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Redirecting...</div>;
    }

    return children;
}