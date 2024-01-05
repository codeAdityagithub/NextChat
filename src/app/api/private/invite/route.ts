import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.searchParams.get("userId")
    if(!userId) return NextResponse.json("No userId provided", {status:400})
    try {
        const invitations = await sql`select u.user_name, u.user_email, i.sent_at from users u join invitation i on i.recipient_id=u.user_id where recipient_id=${userId}`
        return NextResponse.json(invitations, {status:200});
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json(error.message, {status:500});
        
    }
};
