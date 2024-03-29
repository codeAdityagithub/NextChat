"use client";

import { useRouter } from "next/navigation";
import { FaArrowCircleLeft } from "react-icons/fa";

const GoBack = () => {
    const router = useRouter();
    return (
        <button
            title="go back"
            className="h-full pr-2"
            onClick={() => router.replace("/chat")}
        >
            <FaArrowCircleLeft className="text-accent text-2xl" />
        </button>
    );
};

export default GoBack;
