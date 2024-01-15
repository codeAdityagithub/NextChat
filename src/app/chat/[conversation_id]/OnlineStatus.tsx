"use client";

import { socket } from "@/utils/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OnlineStatus = ({ username }: { username: string }) => {
    const [status, setStatus] = useState<"online" | "offline" | "">("");
    const { conversation_id } = useParams();
    useEffect(() => {
        socket.emit("get_status", username, conversation_id);
        const handler = (status: "online" | "offline") => {
            console.log(status);
            setStatus(status);
        };
        socket.on("online_status", handler);
        return () => {
            socket.off("online_status", handler);
        };
    }, [socket]);
    return <div>{status}</div>;
};

export default OnlineStatus;
