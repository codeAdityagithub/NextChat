import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import authOptions from "@/utils/nextauthOptions";
// import axios from "axios";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
