import { Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import env from "../config/dotenv";
import { AuthMiddlewareRequest } from "../types/index.type";
import userModel from "../models/user.model";

export const isAuthenticated = async (
    req: AuthMiddlewareRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.task;

    if (!token) {
        return next(createHttpError(401, "Authentication token is missing"));
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
        console.log(decoded);
        const user = await userModel.findById(decoded);
        console.log(user);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        req.userId = String(user._id);
        next();
    } catch (error) {
        return next(createHttpError(401, "Invalid authentication token"));
    }
};
