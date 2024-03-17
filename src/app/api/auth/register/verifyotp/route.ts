import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/utils/mongo";
import Otp from "@/models/Otps";

type UserData = {
    name: string;
    username: string;
    email: string;
    password: string;
};
connect();

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    // console.log(body);
    if (!body.otp || !body.token || body.otp.length !== 6)
        return NextResponse.json("Invalid request body", { status: 400 });
    const { otp, token }: { otp: string; token: string } = body;
    try {
        const decoded: any = jwt.verify(token, process.env.OTP_JWT_SECRET!);

        const data: UserData = {
            email: decoded.email,
            name: decoded.name,
            username: decoded.username,
            password: decoded.password,
        };
        // otp verify
        const otpDetails = await Otp.findOne({ email: data.email });
        if (!otpDetails || otpDetails.otp.toString() !== otp)
            return NextResponse.json("Incorrect otp", { status: 403 });

        await sql`
            insert into users ${sql(
                data,
                "email",
                "password",
                "name",
                "username"
            )}
            returning id
        `;
        await Otp.findOneAndDelete({ email: data.email });

        return NextResponse.json(
            {
                message: `User Registered Succesfully`,
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.log(err);
        return NextResponse.json(
            { error: err.message || "Something went wrong" },
            { status: 500 }
        );
    }
};
