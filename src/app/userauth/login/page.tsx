import { Metadata } from "next";
import Login from "./Login";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/nextauthOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Login | NextChat",
    description:
        "Welcome back! Login into your account to see your connections",
};

const Page = async () => {
    const session = await getServerSession(authOptions);
    if (session !== null) return redirect("/chat");
    return <Login />;
};

export default Page;
