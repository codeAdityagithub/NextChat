"use client";
import { useEffect, useState } from "react";

const ThemeSetter = () => {
    useEffect(() => {
        const cur = localStorage.getItem("theme") ?? "business";
        document.documentElement.setAttribute("data-theme", cur);
    }, []);

    return <></>;
};

export default ThemeSetter;
