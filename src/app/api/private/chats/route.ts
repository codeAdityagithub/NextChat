import { UserCardInfo } from "@/types";
import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId } = await req.json();
    // console.log(userId);
    if (!userId)
        return NextResponse.json("No userId provided", { status: 400 });
    try {
        const conversations = await sql<UserCardInfo[]>`WITH ids AS (
            SELECT conversation_id
            FROM conversation_users
            WHERE user_id = ${userId}
        )
        SELECT 
            c.conversation_id, 
            cu.user_id,
            u.name,
            u.username from 
            conversation_users cu
        JOIN 
            users u ON u.id = cu.user_id
        JOIN 
            conversation c ON cu.conversation_id = c.conversation_id
        JOIN
            ids ON cu.conversation_id = ids.conversation_id
        WHERE
            cu.user_id != ${userId};`;

        return NextResponse.json(conversations, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(error.message, { status: 500 });
    }
};
