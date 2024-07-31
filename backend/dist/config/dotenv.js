"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const envalid_1 = require("envalid");
const path_1 = __importDefault(require("path"));
if (process.env.NODE_ENV !== "production") {
    (0, dotenv_1.config)({
        path: path_1.default.join(__dirname, `../../.env.${process.env.NODE_ENV || "dev"}`),
    });
}
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    NODE_ENV: (0, envalid_1.str)({
        default: "dev",
        choices: ["test", "production", "dev"],
    }),
    MONGO_LINK: (0, envalid_1.str)(),
    JWT_SECRET: (0, envalid_1.str)(),
    JWT_TOKEN_EXPIRY_DAYS: (0, envalid_1.str)(),
    COOKIE_MAXAGE_DAYS: (0, envalid_1.num)(),
    COOKIE_DOMAIN: (0, envalid_1.str)(),
    FRONTEND_URL: (0, envalid_1.str)(),
});
exports.default = exports.env;
