import { UserType } from "@/types";
import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    const data: UserType = await req.json();
    try {
        const dbuser =
            await sql`select * from users where user_email=${data.user_email}`;

        if (dbuser.length > 0)
            return NextResponse.json(
                { error: "User already Exists" },
                { status: 401 }
            );

        const hashedpwd = await bcrypt.hash(data.user_password, 10);
        data.user_password = hashedpwd;

        const user = await sql`
        insert into users ${sql(
            data,
            "user_email",
            "user_password",
            "user_name"
        )}
        returning user_id
      `;
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
