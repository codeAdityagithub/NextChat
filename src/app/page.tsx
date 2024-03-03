import ThemeSetter from "@/components/ThemeSetter";
import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session !== null) redirect("/chat");
    return (
        <div className="flex flex-col gap-y-4 h-full items-center justify-center bg-base-100">
            <ThemeSetter />
            <div className="relative w-40 h-20 before:content-['*'] before:absolute before:inset-4 before:bg-white before:blur-2xl">
                <Image src="/logo.png" alt="Logo" fill className="" />
            </div>
            <div className="text-xl font-medium">NextChat</div>
            <div className="text-sm text-center px-8 md:px-14 text-base-content">
                Connect instantly. Chat website for seamless conversations and
                new connections. Join the conversation now!
            </div>
            <div className="flex gap-4">
                <Link href={"/api/auth/signin"} className="_btn">
                    Login
                </Link>
                <Link href={"/userauth/register"} className="_btn">
                    Register
                </Link>
            </div>
        </div>
    );
}
