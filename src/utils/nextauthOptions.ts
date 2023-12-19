import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import sql from "@/utils/db";
import jwt from "jsonwebtoken";
// import { UserType } from "@/types";

const authOptions: NextAuthOptions = {
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
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) return null;
                try {
                    // const dbuser = await sql<
                    //     UserType[]
                    // >`select * from users where user_email=${email}`;
                    const dbuser =
                        await sql`select * from users where user_email=${email}`;
                    console.log(dbuser);
                    if (dbuser.length == 0) return null;
                    const user = dbuser[0];
                    const isCorrectPassword = await bcrypt.compare(
                        password,
                        user.user_password
                    );
                    // console.log(isCorrectPassword);
                    if (!isCorrectPassword) return null;
                    const requser: User = {
                        id: user.user_id,
                        name: user.user_name,
                        email: user.user_email,
                    };
                    console.log(requser);
                    return requser;
                } catch (err) {
                    throw new Error("Something went wrong");
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            //   const isAllowedToSignIn = true
            //   if (isAllowedToSignIn) {
            //     return true
            //   } else {
            //     // Return false to display a default error message
            //     return false
            //     // Or you can return a URL to redirect to:
            //     // return '/unauthorized'

            if (account?.provider === "google") {
                if (!user.email || !user.name) return false;

                const dbuser =
                    await sql`select * from users where user_email=${user.email}`;
                if (dbuser.length != 0) return true;

                // if no user in db
                const insertUser =
                    await sql`insert into users(user_name, user_email) values(${user.name}, ${user.email}) returning user_email`;
                // console.log(insertUser);
                if (!insertUser || !insertUser[0].user_email) return false;
            }
            return true;
        },
    },
    jwt: {
        async encode({ secret, token, maxAge }) {
            return jwt.sign(token!, secret);
        },
        // @ts-expect-error
        async decode({ secret, token }) {
            // console.log(token);
            return jwt.verify(token!, secret);
        },
    },

};

export default authOptions;
