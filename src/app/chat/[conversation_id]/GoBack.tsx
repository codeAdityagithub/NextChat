"use client";

import { useRouter } from "next/navigation";
import { FaArrowCircleLeft } from "react-icons/fa";

const GoBack = () => {
    const router = useRouter();
    return (
        <button className="h-full" onClick={() => router.replace("/chat")}>
            <FaArrowCircleLeft className="text-accent text-2xl" />
        </button>
    );
};

export default GoBack;
