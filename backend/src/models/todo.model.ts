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
            maxLength: [100, "title cannot exceed 100 characters"],
            minLength: [2, "title should have at least 2 characters"],
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
    },
);

export default mongoose.model<ITodo>("Todo", todoSchema);
