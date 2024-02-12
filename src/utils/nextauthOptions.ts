import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import sql from "@/utils/db";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User as dbUser } from "@/dbtypes";

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
                    const dbuser = await sql<
                        dbUser[]
                    >`select * from users where email=${email}`;
                    if (dbuser.length == 0) return null;
                    const user = dbuser[0];
                    if (!user.password) return null;
                    // console.log(user);
                    const isCorrectPassword = await bcrypt.compare(
                        password,
                        user.password
                    );
                    // console.log(isCorrectPassword);
                    if (!isCorrectPassword) return null;
                    const timestamp = new Date(user.updated_at!).getTime();

                    const name = {
                        name: user.name,
                        username: user.username,
                        updated: timestamp,
                    };
                    const img = user.has_dp
                        ? `${process.env.NEXT_PUBLIC_API_URL}/static/profiles/${user.id}.jpg?updated=${timestamp}`
                        : undefined;
                    const requser: User = {
                        id: user.id!,
                        name: JSON.stringify(name),
                        email: user.email,
                        image: img,
                    };
                    // console.log(requser);
                    return requser;
                } catch (err) {
                    throw new Error("Something went wrong");
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                if (!user.email || !user.name) return false;
                const dbuser = await sql<
                    dbUser[]
                >`select * from users where email=${user.email}`;

                if (dbuser.length != 0) {
                    // console.log(dbuser[0]);
                    const timestamp = new Date(dbuser[0].updated_at!).getTime();

                    user.id = dbuser[0].id!;
                    const name = {
                        name: dbuser[0].name,
                        username: dbuser[0].username,
                        updated: timestamp,
                    };
                    user.name = JSON.stringify(name);
                    // console.log(user.image);

                    user.image = dbuser[0].has_dp
                        ? `${process.env.NEXT_PUBLIC_API_URL}/static/profiles/${user.id}.jpg?updated=${timestamp}`
                        : undefined;
                    return true;
                }
                // console.log("signin callback");
                // get users with same name as this
                const usernames = await sql<
                    { username: string }[]
                >`select username from users where name=${user.name} order by username desc`;
                // if no user in db
                const suffix: string =
                    usernames.length === 0
                        ? Math.floor(Math.random() * 101).toString()
                        : (
                              parseInt(
                                  usernames[0].username.split("_").pop()!
                              ) + 1
                          ).toString();

                // console.log(suffix);
                const user_id = uuidv4();
                const username = user.name + "_" + suffix;

                // if(res.status==="")
                const insertUser =
                    await sql`insert into users(id, name, email, username) values(${user_id},${user.name}, ${user.email}, ${username}) returning email`;
                // console.log(insertUser);
                if (!insertUser || !insertUser[0].email) return false;
                user.id = user_id;
                const name = {
                    name: user.name,
                    username: username,
                };
                user.name = JSON.stringify(name);
            }
            return true;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            if (token.sub) {
                // console.log(token);
                session.user.id = token.sub;
                // session.user.username = token.username!;
            }
            // console.log(session.user);
            return session;
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update" && session?.image && token.sub) {
                // Note, that `session` can be any arbitrary object, remember to validate it!
                // token.picture = session.image
                const updated = new Date().getTime();
                token.picture = `${process.env.NEXT_PUBLIC_API_URL}/static/profiles/${token.sub}.jpg?updated=${updated}`;
            } else if (
                trigger === "update" &&
                session.name &&
                session.username
            ) {
                const timestamp = new Date().getTime();
                const names = JSON.stringify({
                    name: session.name,
                    username: session.username,
                    updated: timestamp,
                });
                token.name = names;
            }

            return token;
        },
    },
    jwt: {
        async encode({ secret, token }) {
            // console.log(token);
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
