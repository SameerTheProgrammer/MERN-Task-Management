"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, {
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
});
exports.default = mongoose_1.default.model("Todo", todoSchema);
//# sourceMappingURL=todo.model.js.map