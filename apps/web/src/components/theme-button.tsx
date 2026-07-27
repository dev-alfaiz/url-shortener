"use client";

import { useThemeStore } from "@/store/theme.store";

export function ThemeButton() {
    const theme = useThemeStore((state) => state.theme);

    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <button onClick={toggleTheme}>
            Current theme: {theme}
        </button>
    );
}