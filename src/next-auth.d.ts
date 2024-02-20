import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

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
            apiAccessToken: string;
        } & DefaultSession["user"];
    }
    // interface User extends DefaultUser {
    //     apiAccessToken: string;
    // }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        apiAccessToken: string;
    }
}
