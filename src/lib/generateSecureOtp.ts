import crypto from "crypto";

export function generateSecureOTP() {
    const buffer = crypto.randomBytes(3);
    const otp = parseInt(buffer.toString("hex"), 16).toString().substring(0, 6);
    return otp;
}
