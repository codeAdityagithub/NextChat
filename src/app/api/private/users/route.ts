import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const username = req.nextUrl.searchParams.get("username");
    if (!username) return NextResponse.json("No username", { status: 400 });
    // console.log(`${username}`);
    try {
        const users =
            await sql`select name, username,dp  from users where username ILIKE ${`%${username}%`}`;
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Something went wrong", { status: 500 });
    }
};
