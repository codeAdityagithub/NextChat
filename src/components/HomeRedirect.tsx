"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomeRedirect = () => {
    // const router = useRouter();
    // const session = useSession();
    // useEffect(() => {
    //     // console.log(session);
    //     if (session.status === "authenticated") router.push("/chat");
    // }, [session]);
    return <div className="empty:hidden"></div>;
};

export default HomeRedirect;
