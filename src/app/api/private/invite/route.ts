import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const userId = req.nextUrl.searchParams.get("userId")
    if(!userId) return NextResponse.json("No userId provided", {status:400})
    try {
        const invitations = await sql`select u.user_name, u.user_email, i.sent_at, i.invitation_id from users u join invitation i on i.sender_id=u.user_id where i.recipient_id=${userId} and i.status='pending'`
        return NextResponse.json(invitations, {status:200});
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json(error.message, {status:500});
        
    }
};
export const PUT = async (req: NextRequest) => {
    
    const invitation_id= await req.json();
   
    if(!invitation_id) return NextResponse.json("No invitationId provided", {status:400})

    try {
        const invitations = await sql`update invitation set status='accepted' where invitation_id=${invitation_id}`
        // console.log(invitations)
        return NextResponse.json("accepted", {status:200});
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json(error.message, {status:500});
        
    }
};
