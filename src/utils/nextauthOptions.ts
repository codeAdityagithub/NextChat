import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import sql from "@/utils/db";
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
                        name: user.user_username,
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
   
};

export default authOptions