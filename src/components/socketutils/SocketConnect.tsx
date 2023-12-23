"use client";
import { socket } from "@/utils/socket";
import { useEffect } from "react";

const SocketConnect = () => {
    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, []);
    return <div className="hidden">Socket Connections</div>;
};

export default SocketConnect;
