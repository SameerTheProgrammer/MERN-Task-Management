import { Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/dotenv";

const generateJwtToken = (userId: string) => {
    return jwt.sign({ id: String(userId) }, env.JWT_SECRET, {
        expiresIn: env.JWT_TOKEN_EXPIRY_DAYS,
    });
};

export const setCookie = (res: Response, userId: string) => {
    const token = generateJwtToken(userId);
    res.cookie("task", token, {
        httpOnly: true,
        domain: env.FRONTEND_URL || undefined,
        sameSite: "none",
        secure: env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * Number(env.COOKIE_MAXAGE_DAYS),
    });
};
