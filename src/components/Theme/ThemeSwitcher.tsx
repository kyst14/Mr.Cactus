"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
         // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true); 
    }, []);

    if (!mounted) return null;

    const themes = [
        { id: "light", name: "Light" },
        { id: "dark", name: "Dark" },
    ];

    return (
       <div className="flex gap-2 text-text">
            {themes.map((t, i) => (
                <button
                    key={t.id}
                    className={`
                        ${
                            theme === t.id ||
                            (theme === "system" && t.id === "dark" && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
                            (typeof theme === "string" && theme === t.id)
                             ? "text-text" : "text-text/60"}
                        ${i !== themes.length - 1 && "border-r-2 border-text pr-2"}
                    `}
                    onClick={() => setTheme(t.id)}
                >
                    {t.name}
                </button>
            ))}
       </div>
    );
};

export default ThemeSwitcher