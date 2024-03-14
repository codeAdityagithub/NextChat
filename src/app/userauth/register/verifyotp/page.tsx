import jwt from "jsonwebtoken";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import Proceed from "./Proceed";
const Countdown = dynamic(() => import("./Countdown"), { ssr: false });

type Props = {
    searchParams: {
        token: string;
    };
};
type UserData = {
    name: string;
    username: string;
    email: string;
    password: string;
    iat: number;
    exp: number;
};

function verifyToken(token: string, secretKey: string) {
    try {
        const decoded = jwt.verify(token, secretKey);
        // The token is valid; use the decoded information
        return { userData: decoded as UserData, error: "" };
    } catch (err: any) {
        console.error("Token verification failed:", err.message);
        // Propagate the error if needed
        return {
            userData: null,
            error:
                err.message === "jwt expired"
                    ? "token%20expired"
                    : "token%20was%20tampered",
        };
    }
}

const page = ({ searchParams }: Props) => {
    if (!searchParams.token) return redirect("/userauth/register");
    const { error, userData } = verifyToken(
        searchParams.token,
        process.env.OTP_JWT_SECRET!
    );
    if (error !== "" || !userData)
        return redirect(`/userauth/register?error=${error}`);
    const time = userData.exp - Math.floor(new Date().getTime() / 1000);
    // console.log(time);
    return (
        <>
            <h2 className="w-full p-2 text-center text-xl text-base-content">
                Otp Verification | NextChat
            </h2>
            <div className="w-[280px] sm:w-[350px] p-4 sm:p-6 flex flex-col gap-4 bg-neutral text-neutral-content rounded-lg shadow-lg">
                <div className="text-center">
                    An email with a 6 digit otp was sent to{" "}
                    <strong>{userData.email}</strong> for registration of user{" "}
                    <strong>{userData.name}</strong>
                </div>
                <div className="flex items-center gap-2 justify-center">
                    Time Remaining :
                    <Countdown time={time} />
                </div>

                <Proceed token={searchParams.token} />
            </div>
        </>
    );
};

export default page;
