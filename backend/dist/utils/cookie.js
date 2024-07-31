"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("../config/dotenv"));
const generateJwtToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: String(userId) }, dotenv_1.default.JWT_SECRET, {
        expiresIn: dotenv_1.default.JWT_TOKEN_EXPIRY_DAYS,
    });
};
const setCookie = (res, userId) => {
    const token = generateJwtToken(userId);
    res.cookie("task", token, {
        httpOnly: true,
        sameSite: "none",
        secure: dotenv_1.default.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * Number(dotenv_1.default.COOKIE_MAXAGE_DAYS),
    });
};
exports.setCookie = setCookie;
//# sourceMappingURL=cookie.js.map