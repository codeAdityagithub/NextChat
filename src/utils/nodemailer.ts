import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    // @ts-expect-error
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendMail(toEmail: string, otp: string) {
    const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        // to: toEmail,
        // subject: "Your OTP for Verification on NextChat",
        // text: `Hello!\n\nYour OTP for verification is: ${otp}\n\nPlease use this code to complete the verification process.\n\nBest Regards,\nAditya | Nextchat`,
        // html: `
        //     <p>
        //         <img src="https://next-chat-blush.vercel.app/logo-white.png" alt="NextChat Logo" width="200">
        //     </p>
        //     <p>Hello</p>
        //     <p>Your OTP for verification is: <strong>${otp}</strong></p>
        //     <p>Please use this code on Nextchat to complete the verification process.</p>
        //     <p>Best Regards,<br>Aditya | NextChat</p>
        // `,
        to: toEmail,
        subject: "Welcome to NextChat - Your OTP for Verification",
        text: `Hello NextChat User!\n\nYour OTP for NextChat account verification is: ${otp}\n\nEnter this code in NextChat to complete the verification process.\n\nBest Regards,\nAditya from NextChat`,
        html: `
            <p>
                <img src="https://next-chat-blush.vercel.app/logo-white.png" alt="NextChat Logo" width="200">
            </p>
            <h4>Hello NextChat User!</h4>
            <p>Your OTP for NextChat account verification is: <strong>${otp}</strong></p>
            <p>Enter this code in NextChat to complete the verification process.</p>
            <p>Best Regards,<br>Aditya from NextChat</p>
        `,
    });
}
