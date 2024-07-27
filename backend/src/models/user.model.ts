import mongoose from "mongoose";
import validator from "validator";

export interface IUser {
    name: string;
    email: string;
    password: string;
    cpassword: string;
}

const userSchema = new mongoose.Schema(
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
            maxLength: [100, "Password cannot exceed 100 characters"], // Optional but recommended
            select: false,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("User", userSchema);
