import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// interface Iuser {
//     username?: string;
// }

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
    // interface User extends DefaultUser {
    //     username: string;
    // }
}

// declare module "next-auth/jwt" {
//     /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//     interface JWT extends DefaultJWT {
//         username: string;
//     }
// }
