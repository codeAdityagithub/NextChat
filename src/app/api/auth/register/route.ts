import { UserType } from "@/types";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/models/schema";
import { eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
    const data: UserType = await req.json();
    try {
        const dbuser = await db
            .select()
            .from(users)
            .where(eq(users.user_email, data.user_email));

        if (dbuser.length > 0)
            return NextResponse.json(
                { error: "User already Exists" },
                { status: 401 }
            );

        const hashedpwd = await bcrypt.hash(data.user_password, 10);
        data.user_password = hashedpwd;

        const user = await db
            .insert(users)
            .values(data)
            .returning({ user_id: users.user_id });
            
        if (!user)
            return NextResponse.json(
                { error: "Something went wrong" },
                { status: 500 }
            );
        return NextResponse.json({
            message: `User Registered Succesfully`,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
};
