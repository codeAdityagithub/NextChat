"use client";
import { SocketError } from "@/lib/exceptions";
import { socket } from "@/utils/socket";
import { useEffect } from "react";

const SocketConnect = () => {
    const fn = (error: any) => {
        throw new SocketError("Couldn't connect to the socket!");
    };

    useEffect(() => {
        socket.connect();

        socket.on("connect_error", fn);
        return () => {
            socket.off("connect_error", fn);

            socket.disconnect();
        };
    }, []);
    return <div className="hidden">Socket Connections</div>;
};

export default SocketConnect;
