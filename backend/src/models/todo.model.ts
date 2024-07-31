/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Document } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description?: string;
    status: string;
    priority: string;
    deadline?: string;
    user: mongoose.Schema.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<ITodo>(
    {
        title: {
            type: String,
            required: [true, "Please enter title"],
            maxLength: [200, "title cannot exceed 200 characters"],
            minLength: [1, "title should have at least 1 characters"],
        },
        description: {
            type: String,
            maxLength: [500, "description cannot exceed 500 characters"],
            default: "",
        },
        priority: {
            type: String,
            enum: ["High", "Normal", "Low"],
            default: "Low",
        },
        status: {
            type: String,
            enum: ["Progress", "Under Review", "Completed"],
            default: "Under Review",
        },
        deadline: {
            type: String,
            default: "",
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
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

export default mongoose.model<ITodo>("Todo", todoSchema);
