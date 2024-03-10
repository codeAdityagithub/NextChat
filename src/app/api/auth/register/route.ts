import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/mongo";
import Otp from "@/models/Otps";
import Email from "@/models/Emails";
import { generateSecureOTP } from "@/lib/generateSecureOtp";

type UserData = {
    name: string;
    username: string;
    email: string;
    password: string;
};
connect();
export const POST = async (req: NextRequest) => {
    const data: UserData = await req.json();
    // console.log(data);
    if (!data.name || !data.email || !data.password || !data.username)
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    try {
        const totalEmails = await Email.countDocuments();

        if (totalEmails >= 4) {
            return NextResponse.json(
                {
                    error: "Server cannot send more emails at the moment. Please try again later.",
                },
                { status: 503 }
            );
        }
        // const requestedOtps = await Otp.countDocuments({ email: data.email });
        // if (requestedOtps >= 2)
        //     return NextResponse.json(
        //         { error: "Too many otp requests" },
        //         { status: 409 }
        //     );

        const dbuser =
            await sql`select username from users where email=${data.email} or username=${data.username}`;

        if (dbuser.length > 0)
            return NextResponse.json(
                { error: "Username or Email already exists" },
                { status: 401 }
            );

        const hashedpwd = await bcrypt.hash(data.password, 10);
        data.password = hashedpwd;
        // console.log(data);
        const otp = generateSecureOTP();
        // console.log(otp);
        const dbotp = new Otp({
            otp: otp,
            expireAfter: new Date(),
            userData: {
                name: data.name,
                username: data.username,
                password: data.password,
            },
            email: data.email,
        });
        await dbotp.save();

        // TODO: Implement real email sending along with this

        // const email = new Email({ email: data.email, expireAfter: new Date() });
        // await email.save();
        return NextResponse.json(
            { message: "Otp sent to your email! Please verify" },
            { status: 400 }
        );
    } catch (error: any) {
        // console.log(error);
        if (error.keyPattern?.email) {
            return NextResponse.json(
                { error: "Too many otp requests. Please try again later." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
    // try {
    //     const dbuser = await sql<
    //         User[]
    //     >`select * from users where email=${data.email} or username=${data.username}`;

    //     if (dbuser.length > 0)
    //         return NextResponse.json(
    //             { error: "Username or Email already exists" },
    //             { status: 401 }
    //         );

    //     const hashedpwd = await bcrypt.hash(data.password!, 10);
    //     data.password = hashedpwd;

    //     await sql`
    //     insert into users ${sql(data, "email", "password", "name", "username")}
    //     returning id
    //   `;

    //     return NextResponse.json(
    //         {
    //             message: `User Registered Succesfully`,
    //         },
    //         { status: 200 }
    //     );
    // } catch (err: any) {
    //     return NextResponse.json(
    //         { error: err.message || "Something went wrong" },
    //         { status: 500 }
    //     );
    // }
};
