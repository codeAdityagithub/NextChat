import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import authOptions from "./utils/nextauthOptions";
// import { authOptions } from "./app/api/auth/[...nextauth]/route";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
    const session = await getServerSession(authOptions);

    console.log(session?.user);
}

export const config = {
    matcher: ["/chat/:path*"],
};
