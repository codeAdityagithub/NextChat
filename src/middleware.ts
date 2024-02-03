// export { default } from "next-auth/middleware";
import withAuth from "next-auth/middleware";
// import authOptions from "./utils/nextauthOptions";
import jwt from "jsonwebtoken";
import { NextMiddleware, NextRequest, NextResponse } from "next/server";

// @ts-expect-error
export default withAuth({
    jwt: {
        decode: ({ secret, token }) => {
            return jwt.verify(token!, secret);
        },
    },
    callbacks: {
        authorized: ({ req }) => {
            const cookie = req.cookies.get("next-auth.session-token")?.value;
            // console.log(cookie, "cookie");
            return !!cookie;
        },
    },
});

// export const middleware: NextMiddleware = async (req) => {
//     if (req.nextUrl.pathname.startsWith("/chat")) {
//         let conversation_id = req.nextUrl.pathname.split("/chat")[1];
//         if (conversation_id == "") return NextResponse.next();
//         conversation_id = conversation_id.substring(1);
//         console.log(conversation_id);
//     }
// };

export const config = {
    matcher: ["/chat/:path*", "/api/private/:path*"],
};
