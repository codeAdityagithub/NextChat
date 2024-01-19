import { Message, User } from "@/dbtypes";
import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

type otherPerson = Pick<User, "id">;

export const POST = async (req: NextRequest) => {
    console.log("api called for messages");
    try {
        const { conversation_id, userId } = await req.json();
        // console.log(userId, "casdf");
        if (!conversation_id)
            return NextResponse.json({ messages: [] }, { status: 400 });

        const users = await sql<
            otherPerson[]
        >`select u.id from conversation_users cu join users u on u.id=cu.user_id where cu.conversation_id=${conversation_id}`;
        // console.log(users);

        const user = users.filter((user) => user.id === userId);
        if (user.length === 0)
            return NextResponse.json({ messages: [] }, { status: 403 });

        const messages = await sql<
            Message[]
        >`select * from message where conversation_id=${conversation_id} order by created_at desc`;
        return NextResponse.json(
            {
                messages: messages as Array<Message>,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ messages: [] }, { status: 500 });
    }
};
