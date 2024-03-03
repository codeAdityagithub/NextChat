"use client";
import { SocketError } from "@/lib/exceptions";
import { socket } from "@/utils/socket";
import { useEffect } from "react";

const SocketConnect = ({ apiAccessToken }: { apiAccessToken?: string }) => {
    const fn = (error: any) => {
        throw new SocketError("Couldn't connect to the socket!");
    };

    useEffect(() => {
        // @ts-expect-error
        socket.auth.apiAccessToken = apiAccessToken;
        socket.connect();

        socket.on("connect_error", fn);
        return () => {
            socket.off("connect_error", fn);

            socket.disconnect();
        };
    }, [apiAccessToken]);
    return <div className="hidden">Socket Connections</div>;
};

export default SocketConnect;
