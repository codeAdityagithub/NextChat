import mongoose from "mongoose";

interface emailType extends Document {
    expireAfter: number;
    email: string;
}
const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    expireAfter: { type: Date, required: true },
});

const Email =
    (mongoose.models.emails as mongoose.Model<emailType>) ||
    mongoose.model<emailType>("emails", emailSchema);

export default Email;
