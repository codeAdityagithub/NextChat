import Sidebar from "@/components/Sidebar";
import SocketConnect from "@/components/socketutils/SocketConnect";
import authOptions from "@/utils/nextauthOptions";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Chats | NextChat",
    description:
        "Connect instantly. Chat website for seamless conversations and new connections. Join the conversation now!",
};

export default async function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    // const session = await getServerSession(authOptions);
    return (
        <div className="h-full flex gap-3 lg:gap-6 justify-between bg-base-300 text-base-content p-4 overflow-x-hidden">
            {/* Include shared UI here e.g. a header or sidebar */}
            {/* <SocketConnect apiAccessToken={session?.user.apiAccessToken} /> */}
            <Sidebar />
            {children}
        </div>
    );
}
