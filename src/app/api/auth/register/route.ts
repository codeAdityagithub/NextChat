import sql from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/mongo";
import Otp from "@/models/Otps";
import Email from "@/models/Emails";
import { generateSecureOTP } from "@/lib/generateSecureOtp";
import jwt from "jsonwebtoken";
import { sendMail } from "@/utils/nodemailer";
import z from "zod";

const bodySchema = z.object({
    name: z.string().min(3).max(50),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
});
type UserData = z.infer<typeof bodySchema>;
connect();
export const POST = async (req: NextRequest) => {
    const body: UserData = await req.json();
    if (!body.name || !body.email || !body.password || !body.username)
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    const test = bodySchema.safeParse(body);
    if (!test.success)
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const data = test.data;

    try {
        const hasOtp = await Otp.findOne({ email: data.email });
        if (hasOtp)
            return NextResponse.json(
                {
                    error: "Registration already initiated! Please go back to otp verification page with the valid token or wait 5 mins",
                },
                { status: 409 }
            );

        const totalEmails = await Email.countDocuments();

        if (totalEmails >= 100) {
            return NextResponse.json(
                {
                    error: "Server cannot send more emails at the moment. Please try again later.",
                },
                { status: 503 }
            );
        }

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
        await sendMail(data.email, otp);
        // console.log(otp);
        const dbotp = new Otp({
            otp: otp,
            expireAfter: new Date(),
            email: data.email,
        });
        await dbotp.save();

        const email = new Email({ email: data.email, expireAfter: new Date() });
        await email.save();

        const token = jwt.sign(data, process.env.OTP_JWT_SECRET!, {
            expiresIn: "5m",
        });

        return NextResponse.json(
            { message: "Otp sent to your email! Please verify", token: token },
            { status: 200 }
        );
    } catch (error: any) {
        // console.log(error);
        if (error.keyPattern?.email) {
            return NextResponse.json(
                { error: "Too many otp requests. Please try again later." },
                { status: 409 }
            );
        }
        console.log(error.message);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
};
