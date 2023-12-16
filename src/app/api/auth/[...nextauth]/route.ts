import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";
import bcrypt from "bcryptjs";
import sql from "@/utils/db";
import { UserType } from "@/types";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // ...add more providers here
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "abc@email.com",
                    required: true,
                },
                password: {
                    label: "Password",
                    type: "password",
                    required: true,
                },
            },
            async authorize(credentials, req) {
                const { email, password } = { ...credentials };
                if (!email || !password) return null;
                try {
                    // axios.post("http://localhost:8000/auth/login", {
                    //     email,
                    //     password,
                    // });
                    const dbuser =
                        await sql`select * from users where user_email=${email}`;

                    if (dbuser.length == 0) return null;
                    const { user_id, ...user } = dbuser[0];
                    console.log(user);
                    const userpwd = user.user_password;
                    const isCorrectPassword = await bcrypt.compare(
                        password,
                        userpwd
                    );
                    if (!isCorrectPassword) return null;

                    return user;
                } catch (err) {
                    console.log(err);
                    return null;
                }
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
