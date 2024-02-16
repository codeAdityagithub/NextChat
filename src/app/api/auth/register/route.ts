import { User } from "@/dbtypes";
import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    const data: User = await req.json();
    // console.log(data);
    try {
        const dbuser = await sql<
            User[]
        >`select * from users where email=${data.email} or username=${data.username}`;

        if (dbuser.length > 0)
            return NextResponse.json(
                { error: "Username or Email already exists" },
                { status: 401 }
            );

        const hashedpwd = await bcrypt.hash(data.password!, 10);
        data.password = hashedpwd;

        await sql`
        insert into users ${sql(data, "email", "password", "name", "username")}
        returning id
      `;

        return NextResponse.json(
            {
                message: `User Registered Succesfully`,
            },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: 500 }
        );
    }
};
