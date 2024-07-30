import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// Define a TypeScript interface for the User document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [2, "Name should have at least 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [8, "Password should be at least 8 characters long"],
            maxLength: [100, "Password cannot exceed 100 characters"],
            select: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                // Optionally, convert _id to a string if it's an ObjectId
                // ret.id = ret._id.toString();
            },
        },
        toObject: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                // Optionally, convert _id to a string if it's an ObjectId
                // ret.id = ret._id.toString();
            },
        },
    },
);

// Hash the user password before saving
userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare Password
userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, String(this.password));
};

export default mongoose.model<IUser>("User", userSchema);
