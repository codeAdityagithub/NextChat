import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NextChat",
    description: "Chat app using next js",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <div className="h-screen flex gap-3 lg:gap-6 bg-slate-100 p-4">
                    <Sidebar />
                    <main className="h-full flex-[2]">{children}</main>
                </div>
            </body>
        </html>
    );
}
