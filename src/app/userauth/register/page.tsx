import { Metadata } from "next";
import Register from "./Register";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/nextauthOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Register | NextChat",
    description: "Register yourself to NextChat, and create new Connections",
};

const Page = async () => {
    const session = await getServerSession(authOptions);
    if (session !== null) return redirect("/chat");
    return <Register />;
};

export default Page;
