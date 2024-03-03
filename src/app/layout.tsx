import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/utils/AuthProvider";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NextChat",
    description:
        "Connect instantly. Chat website for seamless conversations and new connections. Join the conversation now!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="business">
            <body className={roboto.className}>
                <main className="h-[100svh] min-h-[550px] bg-base-300 text-base-content">
                    <AuthProvider>
                        <ReactQueryProvider>{children}</ReactQueryProvider>
                    </AuthProvider>
                </main>
            </body>
        </html>
    );
}
