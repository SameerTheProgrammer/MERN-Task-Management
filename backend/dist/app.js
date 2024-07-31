"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
// import csrf from "csurf";
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const logger_1 = __importDefault(require("./config/logger"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const dotenv_1 = __importDefault(require("./config/dotenv"));
// Initialize Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// All security related middlewares
const allowedOrigins = dotenv_1.default.NODE_ENV === "production"
    ? ["https://taskman-hazel.vercel.app,"]
    : ["http://localhost:5173"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies and other credentials to be sent
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders: [
        "X-CSRF-Token",
        "X-Requested-With",
        "Accept",
        "Accept-Version",
        "Content-Length",
        "Content-MD5",
        "Content-Type",
        "Date",
        "X-Api-Version",
    ],
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
// app.use(csrf({ cookie: true }));
app.use((0, hpp_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/todo", todo_route_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Task Management site");
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        logger_1.default.error(err.message);
        const statusCode = err.statusCode || err.status || 500;
        res.status(statusCode).json({
            error: [
                {
                    type: err.name,
                    msg: err.message,
                    path: "",
                    location: "",
                },
            ],
        });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map