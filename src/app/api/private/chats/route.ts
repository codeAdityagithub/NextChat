import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId } = await req.json();
    // console.log(userId);
    if (!userId)
        return NextResponse.json("No userId provided", { status: 400 });
    try {
        const conversations =
            await sql`SELECT c.conversation_id, c.created_at, cu.user_id AS participant_id
            FROM conversation c
            JOIN conversation_users cu ON c.conversation_id = cu.conversation_id
            WHERE cu.user_id = 'your_user_id'`;
        return NextResponse.json(conversations, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(error.message, { status: 500 });
    }
};
