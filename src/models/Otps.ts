import mongoose, { Document } from "mongoose";

interface otpType extends Document {
    otp: number;
    expireAfter: number;
    userData: {
        name: string;
        username: string;
        password: string;
    };
    email: string;
}
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: { type: Number, required: true },
    userData: { type: Object, required: true },
    expireAfter: { type: Date, required: true },
});

const Otp =
    (mongoose.models.otps as mongoose.Model<otpType>) ||
    mongoose.model<otpType>("otps", otpSchema);

export default Otp;
