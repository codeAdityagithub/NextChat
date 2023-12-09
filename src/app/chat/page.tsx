import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-[2] flex-col gap-y-4 h-full items-center justify-center">
            <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={64}
                className=""
            />
            <div className="text-xl font-medium">NextChat</div>
            <div className="text-sm font-light text-center px-8 md:px-14 ">
                Connect instantly. Chat website for seamless conversations and
                new connections. Join the conversation now!
            </div>
        </div>
    );
}
