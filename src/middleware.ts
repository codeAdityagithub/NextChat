// export { default } from "next-auth/middleware";
import withAuth from "next-auth/middleware";
// import authOptions from "./utils/nextauthOptions";
import jwt from "jsonwebtoken";

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

export const config = {
    matcher: ["/chat/:path*", "/api/private"],
};
