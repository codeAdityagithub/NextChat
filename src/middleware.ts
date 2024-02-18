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
            const cookie = req.cookies.get(
                process.env.NODE_ENV === "development"
                    ? "next-auth.session-token"
                    : "__Secure-next-auth.session-token"
            )?.value;
            // console.log(cookie, "cookie");
            return !!cookie;
        },
    },
});

// export const middleware: NextMiddleware = async (req) => {
//     console.log(req.nextUrl.pathname);
//     if (req.nextUrl.pathname === "/chat/settings") {
//         const url = req.nextUrl.clone();
//         url.pathname = "/chat/settings/profile";
//         return NextResponse.redirect(url);
//     }
// };

export const config = {
    matcher: ["/chat/:path*", "/api/private/:path*"],
};
