import sql from "@/utils/db";
import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { name, username } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user.id || !session.user.name)
        return NextResponse.json("Unauthorized", { status: 403 });

    const { updated } = JSON.parse(session.user.name);
    if (updated && !isNaN(updated)) {
        // console.log(updated);
        const curDate = new Date().getTime();
        const diff = (curDate - updated) / 1000;
        // console.log(diff);
        if (diff < 0) {
            return NextResponse.json(
                "You can only update your profile once a day",
                { status: 429 }
            );
        }
    }

    try {
        await sql`update users set name=${name}, username=${username} where id=${session.user.id}`;
        return NextResponse.json(
            { name, username },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.log(error.message);
        if (error.constraint_name === "users_username_key")
            return NextResponse.json("This username is already taken", {
                status: 500,
            });
        return NextResponse.json(
            "Couldn't Update your profile, at this moment!",
            { status: 500 }
        );
    }
};
