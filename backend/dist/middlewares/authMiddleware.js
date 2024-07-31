"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("../config/dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.task;
    if (!token) {
        return next((0, http_errors_1.default)(401, "Authentication token is missing"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, dotenv_1.default.JWT_SECRET);
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        req.userId = String(user._id);
        next();
    }
    catch (error) {
        return next((0, http_errors_1.default)(401, "Invalid authentication token"));
    }
});
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authMiddleware.js.map