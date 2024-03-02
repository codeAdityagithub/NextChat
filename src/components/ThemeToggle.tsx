"use client";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const [mode, setMode] = useState<string>("");
    useEffect(() => {
        const cur = localStorage.getItem("theme") ?? "business";
        setMode(cur);
        document.documentElement.setAttribute("data-theme", cur);
    }, []);
    const handleClick = () => {
        if (mode == "business") {
            localStorage.setItem("theme", "light");
            setMode("light");

            document.documentElement.setAttribute("data-theme", "light");
        } else {
            localStorage.setItem("theme", "business");
            setMode("business");
            document.documentElement.setAttribute("data-theme", "business");
        }
    };
    return (
        <div
            className="text-2xl cursor-pointer p-2"
            onClick={handleClick}
            aria-label="toggle theme"
        >
            {mode == "business" ? (
                <MdOutlineLightMode />
            ) : (
                <MdOutlineDarkMode />
            )}
        </div>
    );
};

export default ThemeToggle;
