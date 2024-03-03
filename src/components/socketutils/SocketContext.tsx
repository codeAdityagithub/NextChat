"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_API_URL!;

const socketContext = createContext<Socket | undefined>(undefined);

const SocketContext = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket>();
    const session = useSession();

    useEffect(() => {
        const temp = io(URL, {
            autoConnect: false,
            auth: { apiAccessToken: session.data?.user.apiAccessToken },
        });
    }, [session]);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
};

export default SocketContext;
