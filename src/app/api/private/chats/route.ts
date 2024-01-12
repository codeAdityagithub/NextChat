import { UserCardInfo } from "@/types";
import sql from "@/utils/db";
import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: NextRequest) => {
//     const conversation_id = req.nextUrl.searchParams.get("conversation_id");
//     console.log(conversation_id);
//     if (!conversation_id)
//         return NextResponse.json("No conversation_id", { status: 401 });
//     const session = await getServerSession(authOptions);
//     const userid = session;
//     console.log(userid);
//     try {
//         const conversations =
//             await sql`select c from conversation c join conversation_users cu on c.conversation_id=cu.conversation_id where c.conversation_id=${conversation_id}`;
//         console.log(conversations);
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json("Something went wrong", { status: 500 });
//     }

//     NextResponse.json("chats get");
// };

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
            cu.user_id != ${userId} order by c.last_contacted_at desc`;

        return NextResponse.json(conversations, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(error.message, { status: 500 });
    }
};
