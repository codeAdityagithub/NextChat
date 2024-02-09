import Image from "next/image";

export default function Home() {
    return (
        <div
            className={`hidden md:flex md:flex-[2] lg:flex-[3] flex-col gap-y-4 h-full items-center justify-center`}
        >
            <div className="relative w-40 h-20 before:content-['*'] before:absolute before:inset-4 before:bg-white before:blur-2xl">
                <Image src="/logo.png" alt="Logo" fill className="" />
            </div>
            <div className="text-xl font-medium">NextChat</div>
            <div className="text-sm font-light text-center px-8 md:px-14 ">
                Connect instantly. Chat website for seamless conversations and
                new connections. Join the conversation now!
            </div>
        </div>
    );
}
