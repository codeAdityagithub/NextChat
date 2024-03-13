import mongoose from "mongoose";

interface failedLoginType extends Document {
    expireAfter: number;
    email: string;
    attempts: number;
}
const FailedLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
        default: 1,
    },
    expireAfter: { type: Date, required: true },
});

const FailedLogins =
    (mongoose.models.failedlogins as mongoose.Model<failedLoginType>) ||
    mongoose.model<failedLoginType>("failedlogins", FailedLoginSchema);

export default FailedLogins;
