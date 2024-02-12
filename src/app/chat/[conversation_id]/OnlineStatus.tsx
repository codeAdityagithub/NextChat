"use client";

import { socket } from "@/utils/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OnlineStatus = ({ id }: { id: string | undefined }) => {
    const [status, setStatus] = useState<"online" | "offline" | "">("");
    const { conversation_id } = useParams();
    useEffect(() => {
        const int = setInterval(
            () => socket.emit("get_status", id, conversation_id),
            2000
        );
        const handler1 = (status: "online" | "offline") => {
            // console.log(status);
            setStatus(status);
        };
        socket.on("online_status", handler1);
        // socket.on("user_status", handler1);
        return () => {
            socket.off("online_status", handler1);
            // socket.off("user_status", handler1);
            clearInterval(int);
        };
    }, [status, conversation_id, id]);
    return <span>{status}</span>;
};

export default OnlineStatus;
