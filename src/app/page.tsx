import ThemeSetter from "@/components/ThemeSetter";
import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session !== null) return redirect("/chat");
    return (
        // <div className="bg-gradient-to-b from-blue-900 to-blue-600 min-h-screen flex flex-col justify-center items-center">
        //     <h1 className="text-white text-4xl font-bold mb-4">NEXT CHAT</h1>
        //     <p className="text-white text-lg mb-8">Connect instantly.</p>
        //     <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
        //         Join the Conversation Now
        //     </button>
        // </div>
        <div className="flex flex-col gap-y-4 h-full items-center justify-center text-primary-content bg-gradient-to-br from-blue-600 to-purple-800">
            <ThemeSetter />
            <div className="relative w-60 h-32 before:content-['*'] before:absolute before:inset-4 before:bg-purple-200 before:animate-myping before:blur-2xl">
                <Image src="/logo.png" alt="Logo" fill className="" />
            </div>
            {/* <div className="text-xl font-medium">NextChat</div> */}
            <div className="text-center px-8 md:px-14">
                <h1 className="text-3xl font-bold mb-4">Connect instantly.</h1>
                <p className="mb-6">
                    Chat website for seamless conversations and new connections.
                </p>
                <Link
                    href={"/userauth/login"}
                    className="_btn bg-accent text-accent-content shadow-md py-2 px-6 rounded-full transition-colors hover:bg-accent/80"
                >
                    Join the Conversation Now!
                </Link>
            </div>
        </div>
    );
}
